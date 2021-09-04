#include "values.h"
#include "objects.h"
#include "closures.h"

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
 * Global utils
 */

void values_init() {
  value_null = value_factory(type_null);

  value_false = value_factory_boolean(0);
  value_true = value_factory_boolean(1);

  value_empty_string = value_factory_string(0, 0, NULL);
  value_empty_object = value_factory_object(0);

  value_empty_function = value_factory(type_function);
  closure_init(&(value_empty_function->content.function.closure), 0);
}

t_value *value_factory(t_type *type) {
  t_value *value = calloc(1, sizeof(t_value));
  value->type = type;
  return value;
}

t_value *value_factory_boolean(t_boolean boolean) {
  t_value *value = value_factory(type_boolean);
  value->content.boolean = boolean;
  return value;
}

t_value *value_factory_i32(t_i32 number) {
  t_value *value = value_factory(type_i32);
  value->content.i32 = number;
  return value;
}

t_value *value_factory_string(t_u32 hash, t_u32 size, t_i8 *chars) {
  t_value *value = value_factory(type_string);
  value->content.string.hash = hash;
  value->content.string.size = size;
  value->content.string.chars = chars;
  return value;
}

t_value *value_factory_object(t_type *type, t_u32 size) {
  t_value *value = value_factory(type);
  object_init((t_object *)value, size);
  return value;
}

t_value *value_factory_function(t_type *type, t_u32 size, void *callable) {
  t_value *value = value_factory(type);
  closure_init((t_closure *)value, size);
  value->content.function.callable = callable;
  return value;
}
