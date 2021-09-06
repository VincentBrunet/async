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
  value->content.boolean = boolean;
  return value;
}

t_value *value_factory_i32(t_i32 number)
{
  t_value *value = value_factory(type_i32);
  value->content.i32 = number;
  return value;
}

t_value *value_factory_f32(t_f32 number)
{
  t_value *value = value_factory(type_f32);
  value->content.f32 = number;
  return value;
}

t_value *value_factory_string(t_u32 hash, t_u32 size, t_i8 *chars)
{
  t_value *value = value_factory(type_string);
  value->content.string.hash = hash;
  value->content.string.size = size;
  value->content.string.chars = chars;
  return value;
}

t_value *value_factory_object(t_type *type, t_u32 size, ...)
{
  t_value *value = value_factory(type);
  object_init(value, size);
  if (size > 0)
  {
    t_variable *variables = value->content.object.variables;
    va_list keys;
    va_start(keys, size);
    for (t_u32 idx = 0; idx < size; idx++)
    {
      t_u32 key = va_arg(keys, t_u32);
      variables[idx].key = key;
    }
    va_end(keys);
  }
  return value;
}

t_value *value_factory_function(t_type *type, void *callable, t_u32 size, ...)
{
  t_value *value = value_factory(type);
  t_function *function = (t_function *)value;
  t_closure *closure = (t_closure *)value;
  closure_init(closure, size);
  function->callable = callable;
  if (size > 0)
  {
    t_variable **variables = closure->variables;
    va_list dependencies;
    va_start(dependencies, size);
    for (t_u32 idx = 0; idx < size; idx++)
    {
      t_variable *dependency = va_arg(dependencies, t_variable *);
      variables[idx] = dependency;
    }
    va_end(dependencies);
  }
  return value;
}
