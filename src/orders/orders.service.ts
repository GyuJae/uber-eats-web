import { Inject, Injectable } from '@nestjs/common';
import { OrderStatus, Role } from '@prisma/client';
import {
  NEW_COOKED_ORDER,
  NEW_ORDER_UPDATE,
  NEW_PENDING_ORDER,
  PUB_SUB,
} from 'src/common/common.constants';
import { PrismaService } from 'src/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { OrderEntity } from './entities/order.entity';
import { PubSub } from 'graphql-subscriptions';
import { TakeOrderInput, TakeOrderOutput } from './dtos/take.order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  async createOrder(
    { optionsSelects, restaurantId, dishId }: CreateOrderInput,
    client: UserEntity,
  ): Promise<CreateOrderOutput> {
    try {
      const restaurant = await this.prismaService.restaurant.findUnique({
        where: {
          id: restaurantId,
        },
        include: {
          dishes: {
            include: {
              options: true,
              orderItems: true,
            },
          },
        },
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'This restaurant id does not exist.',
        };
      }
      const dish = await this.prismaService.dish.findUnique({
        where: {
          id: dishId,
        },
        select: {
          id: true,
        },
      });
      if (!dish) {
        return {
          ok: false,
          error: 'This dish Id does not exist.',
        };
      }

      for (const option of optionsSelects) {
        const dishOption = await this.prismaService.dishOption.findUnique({
          where: {
            id: option.optionId,
          },
          select: {
            id: true,
            dishId: true,
          },
        });
        if (!dishOption && dishOption.dishId !== dish.id) {
          return {
            ok: false,
            error: 'This dish option id does not exist',
          };
        }
        const dishOptionChoice =
          await this.prismaService.dishOptionChoice.findFirst({
            where: {
              id: option.choiceId,
              dishOptionId: dishOption.id,
            },
            select: {
              id: true,
            },
          });
        if (!dishOptionChoice) {
          return {
            ok: false,
            error: 'This dish option choice id does not exist.',
          };
        }
      }
      const order = await this.prismaService.order.create({
        data: {
          clientId: client.id,
          restaurantId: restaurant.id,
        },
        select: {
          id: true,
        },
      });
      const optionsSelectsClean = optionsSelects.map((option) => ({
        dishId_optionId_choiceId_orderId: {
          dishId: dish.id,
          optionId: option.optionId,
          choiceId: option.choiceId,
          orderId: order.id,
        },
      }));
      await this.prismaService.orderItem.create({
        data: {
          orderId: order.id,
          dishId: dish.id,
          selectOptionChoices: {
            connect: optionsSelectsClean,
          },
        },
      });
      const resultOrder = await this.prismaService.order.findUnique({
        where: {
          id: order.id,
        },
        include: {
          restaurant: {
            select: {
              ownerId: true,
            },
          },
          orderItems: true,
        },
      });
      await this.pubSub.publish(NEW_PENDING_ORDER, {
        pendingOrders: resultOrder,
      });

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getOrders(
    { status }: GetOrdersInput,
    user: UserEntity,
  ): Promise<GetOrdersOutput> {
    try {
      let orders: OrderEntity[];
      if (user.role === Role.Client) {
        orders = await this.prismaService.order.findMany({
          where: {
            clientId: user.id,
            ...(status && {
              status,
            }),
          },
        });
      } else if (user.role === Role.Owner) {
        orders = await this.prismaService.order.findMany({
          where: {
            restaurant: {
              ownerId: user.id,
            },
            ...(status && { status }),
          },
        });
      } else if (user.role === Role.Delivery) {
        orders = await this.prismaService.order.findMany({
          where: {
            driverId: user.id,
          },
        });
      }
      return {
        ok: true,
        orders,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getOrder(
    { orderId }: GetOrderInput,
    user: UserEntity,
  ): Promise<GetOrderOutput> {
    try {
      const order = await this.prismaService.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          restaurant: {
            select: {
              ownerId: true,
            },
          },
        },
      });
      if (!order) {
        return {
          ok: false,
          error: 'This order Id does not exist.',
        };
      }
      let canSee = false;
      if (
        order.clientId === user.id ||
        order.driverId === user.id ||
        order.restaurant.ownerId === user.id
      ) {
        canSee = true;
      }
      if (!canSee) {
        return {
          ok: false,
          error: 'No Authorization.',
        };
      }
      return {
        ok: true,
        order,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editOrder(
    { orderId, status }: EditOrderInput,
    user: UserEntity,
  ): Promise<EditOrderOutput> {
    try {
      if (status === OrderStatus.Pending) {
        return {
          ok: false,
          error: 'No edit pending',
        };
      }
      if (user.role === Role.Client) {
        return {
          ok: false,
          error: 'Your role client is no authorzation',
        };
      }
      const order = await this.prismaService.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          restaurant: {
            select: {
              ownerId: true,
            },
          },
        },
      });
      if (!order) {
        return {
          ok: false,
          error: 'This order id does not exist.',
        };
      }
      if (
        user.role === Role.Delivery &&
        (status === OrderStatus.Cooked || status === OrderStatus.Cooking)
      ) {
        return {
          ok: false,
          error: 'Delivery only change pickup or deliveried.',
        };
      }
      if (user.role === Role.Delivery && order.driverId !== user.id) {
        return {
          ok: false,
          error:
            'You cannot edit this order because you do not drivie this order',
        };
      }
      if (
        user.role === Role.Owner &&
        (status === OrderStatus.Delivered || status === OrderStatus.PickedUp)
      ) {
        return {
          ok: false,
          error: 'Owner only change cooked or cooking.',
        };
      }
      const orderResult = await this.prismaService.order.update({
        where: {
          id: order.id,
        },
        data: {
          status,
        },
        include: {
          restaurant: {
            select: {
              ownerId: true,
            },
          },
        },
      });
      if (user.role === Role.Owner) {
        if (status === OrderStatus.Cooked) {
          await this.pubSub.publish(NEW_COOKED_ORDER, {
            cookedOrders: orderResult,
          });
        }
      }
      await this.pubSub.publish(NEW_ORDER_UPDATE, { updateOrder: orderResult });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async takeOrder(
    { orderId }: TakeOrderInput,
    driver: UserEntity,
  ): Promise<TakeOrderOutput> {
    try {
      const order = await this.prismaService.order.findUnique({
        where: {
          id: orderId,
        },
      });
      if (!order) {
        return {
          ok: false,
          error: 'This order id does not exist.',
        };
      }
      if (order.driverId) {
        return {
          ok: false,
          error: 'This order already has a driver.',
        };
      }
      const orderResult = await this.prismaService.order.update({
        where: {
          id: order.id,
        },
        data: {
          driverId: driver.id,
        },
        include: {
          restaurant: {
            select: {
              ownerId: true,
            },
          },
        },
      });
      await this.pubSub.publish(NEW_ORDER_UPDATE, {
        updateOrder: orderResult,
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
