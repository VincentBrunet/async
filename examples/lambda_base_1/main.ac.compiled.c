#include <runtime.h>

t_value *f_0x1(t_closure *closure)
{
  t_value *module;
  function_call_1(object_variable(module, /*log*/107332)->value, object_variable(module, /*num*/109446)->value);
  return value_null;
}

t_value *f_0x0(t_closure *closure)
{
  t_value *module;
  object_variable(module, /*f*/102)->value = function_make_x(type_function, f_0x1, 0);
  function_call_0(object_variable(module, /*f*/102)->value);
  return value_null;
}

t_value *module_load()
{
  t_value *module = object_make_x(type_object, 7, /*numHex*/-1034389067, /*c1*/3118, /*c2*/3119, /*c3*/3120, /*num*/109446, /*hello*/99162322, /*world*/113318802);
  object_variable(module, /*num*/109446)->value = number_i32_make(42);
  object_variable(module, /*numHex*/-1034389067)->value = number_i32_make(255);
  object_variable(module, /*c1*/3118)->value = value_true;
  object_variable(module, /*c2*/3119)->value = value_false;
  object_variable(module, /*c3*/3120)->value = value_null;
  object_variable(module, /*hello*/99162322)->value = function_make_x(type_function, f_0x0, 0);
  object_variable(module, /*world*/113318802)->value = object_variable(module, /*hello*/99162322)->value;
  function_call_0(object_variable(module, /*world*/113318802)->value);
  return module;
}


t_value *(*main_module)() = module_load;
