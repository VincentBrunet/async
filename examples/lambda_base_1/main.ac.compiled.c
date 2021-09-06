#include <runtime.h>

t_value *o_0x0()
{
  // Variables
  t_value *object = object_make_x(type_object, 1, /*dudu*/ 3094754);
  t_variable *variables = object->content.object.variables;
  t_variable *__dudu = &(variables[0]);
  // Logic
  object_variable(module, /*dudu*/ 3094754)->value = number_i32_make(32);
  // After
  return object;
}

t_value *f_0x1(t_closure *closure)
{
  // Logic
  function_call_1(object_variable(module, /*log*/ 107332)->value, object_variable(module, /*num*/ 109446)->value);
  // After
  return value_null;
}

t_value *f_0x0(t_closure *closure)
{
  // Variables
  t_variable *f = variable_make(102);
  // Logic
  object_variable(module, /*f*/ 102)->value = function_make_x(type_function, f_0x1, 0);
  function_call_0(object_variable(module, /*f*/ 102)->value);
  // After
  return value_null;
}

t_value *module_load()
{
  // Variables
  t_value *module = object_make_x(type_object, 8, /*numHex*/ -1034389067, /*c1*/ 3118, /*c2*/ 3119, /*c3*/ 3120, /*num*/ 109446, /*obj*/ 109815, /*hello*/ 99162322, /*world*/ 113318802);
  t_variable *variables = module->content.object.variables;
  t_variable *__numHex = &(variables[0]);
  t_variable *__c1 = &(variables[1]);
  t_variable *__c2 = &(variables[2]);
  t_variable *__c3 = &(variables[3]);
  t_variable *__num = &(variables[4]);
  t_variable *__obj = &(variables[5]);
  t_variable *__hello = &(variables[6]);
  t_variable *__world = &(variables[7]);
  // Logic
  object_variable(module, /*num*/ 109446)->value = number_i32_make(42);
  object_variable(module, /*numHex*/ -1034389067)->value = number_i32_make(255);
  object_variable(module, /*c1*/ 3118)->value = value_true;
  object_variable(module, /*c2*/ 3119)->value = value_false;
  object_variable(module, /*c3*/ 3120)->value = value_null;
  object_variable(module, /*obj*/ 109815)->value = o_0x0();
  object_variable(module, /*hello*/ 99162322)->value = function_make_x(type_function, f_0x0, 0);
  object_variable(module, /*world*/ 113318802)->value = object_variable(module, /*hello*/ 99162322)->value;
  function_call_1(object_variable(module, /*world*/ 113318802)->value, object_variable(module, /*obj*/ 109815)->value);
  // After
  return module;
}

t_value *(*main_module)() = module_load
