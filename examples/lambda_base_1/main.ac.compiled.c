#include <runtime.h>

t_value *f_0x1()
{
  t_value *module;
  function_call_1(object_get(module, 107332)->value, object_get(module, 109446)->value);
  return value_null;
}

t_value *f_0x0()
{
  t_value *module;
  object_get(module, 102)->value = value_factory_function(type_function, f_0x1, 0);
  function_call_0(object_get(module, 102)->value);
  return value_null;
}

t_value *module_load()
{
  t_value *module = value_factory_object(type_object, 7, /* numHex */ -1034389067, /* c1 */ 3118, /* c2 */ 3119, /* c3 */ 3120, /* num */ 109446, /* hello */ 99162322, /* world */ 113318802);
  object_get(module, 109446)->value = value_factory_i32(42);
  object_get(module, -1034389067)->value = value_factory_i32(255);
  object_get(module, 3118)->value = value_true;
  object_get(module, 3119)->value = value_false;
  object_get(module, 3120)->value = value_null;
  object_get(module, 99162322)->value = value_factory_function(type_function, f_0x0, 0);
  object_get(module, 113318802)->value = object_get(module, 99162322)->value;
  function_call_0(object_get(module, 113318802)->value);
  return module;
}

t_value *(*main_module)() = module_load;
