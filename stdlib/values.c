#include "values.h"

/**
 * Global native values
 */

t_value *value_null = NULL;

t_value *value_false = NULL;
t_value *value_true = NULL;

t_value *value_empty_string = NULL;
t_value *value_empty_object = NULL;
t_value *value_empty_function = NULL;

/**
 * Global util
 */

t_value *value_factory(t_type *type)
{
  t_value *value = calloc(1, sizeof(t_value));
  value->type = type;
  return value;
}

void values_init()
{
  value_null = value_factory(type_null);

  value_false = value_factory_boolean(0);
  value_true = value_factory_boolean(1);

  value_empty_string = value_factory_string(0, 0, NULL);
  value_empty_object = value_factory_object(type_object, 0);
  value_empty_function = value_factory_function(type_function, NULL, 0);
}

t_value *value_factory_boolean(t_boolean boolean)
{
  t_value *value = value_factory(type_boolean);
  value->data.boolean = boolean;
  return value;
}

t_value *value_factory_f32(t_f32 number)
{
  t_value *value = value_factory(type_f32);
  value->data.f32 = number;
  return value;
}

t_value *value_factory_string(t_u32 hash, t_u32 size, t_i8 *chars)
{
  t_value *value = value_factory(type_string);
  //value->data.string.hash = hash;
  //value->data.string.size = size;
  //value->data.string.chars = chars;
  return value;
}
