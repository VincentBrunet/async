#include "values.h"

/**
 * Global native values
 */

t_value *value_null = NULL;

t_value *value_false = NULL;
t_value *value_true = NULL;

t_value *value_empty_string = NULL;
t_value *value_empty_object = NULL;

/**
 * Global utils
 */

void values_init() {
  value_null = value_factory(type_null);

  value_false = value_factory(type_boolean);
  value_false->content.boolean = 0;
  value_true = value_factory(type_boolean);
  value_true->content.boolean = 1;

  value_empty_string = value_factory(type_string);
  value_empty_string->content.string.hash = 0;
  value_empty_string->content.string.size = 0;
  value_empty_string->content.string.chars = NULL;

  value_empty_object = value_factory(type_object);
  value_empty_object->content.object.fields.size = 0;
  value_empty_object->content.object.fields.items = NULL;
}

t_value *value_factory(t_type *type) {
  t_value *value = calloc(1, sizeof(t_value));
  value->type = type;
  return value;
}

t_value *value_factory_i32(t_i32 number) {
  t_value *value = value_factory(type_i32);
  value->content.i32 = number;
  return value;
}
