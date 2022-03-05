import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core-output.dto';
import { SelectOptionChoicesEntity } from '../entities/order.entity';

@InputType()
class SelectOptionChoicesInput extends PickType(
  SelectOptionChoicesEntity,
  ['optionId', 'choiceId'],
  InputType,
) {}

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  restaurantId: number;

  @Field(() => Int)
  dishId: number;

  @Field(() => [SelectOptionChoicesInput])
  optionsSelects: SelectOptionChoicesInput[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
