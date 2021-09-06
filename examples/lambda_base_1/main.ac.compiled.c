#include <runtime.h>

t_value *o_0x0()
{
  // Variables
  t_value *object = object_make_x(type_object, 1, /*dudu*/ 3094754);
  t_variable *variables = object->content.object.variables;
  t_variable *__dudu = &(variables[0]);
  // Logic
  __dudu = number_i32_make(32);
  // After
  return object;
}

t_value *f_0x1(t_closure *closure, t_value *__num2)
{
  // Logic
  function_call_2(closure_variable(closure, /*hello*/ 99162322)->value, closure_variable(closure, /*num*/ 109446)->value, __num2);
  // After
  return value_null;
}

t_value *f_0x0(t_closure *closure, t_value *__num)
{
  // Variables
  t_variable *__f = variable_make(102);
  // Logic
  __f = function_make_x(type_function, f_0x1, 0);
  function_call_1(__f, __num);
  // After
  return value_null;
}

t_value *module_load()
{
  // Variables
  t_value *module = object_make_x(type_object, 7, /*numHex*/ -1034389067, /*c1*/ 3118, /*c2*/ 3119, /*c3*/ 3120, /*obj*/ 109815, /*hello*/ 99162322, /*world*/ 113318802);
  t_variable *variables = module->content.object.variables;
  t_variable *__numHex = &(variables[0]);
  t_variable *__c1 = &(variables[1]);
  t_variable *__c2 = &(variables[2]);
  t_variable *__c3 = &(variables[3]);
  t_variable *__obj = &(variables[4]);
  t_variable *__hello = &(variables[5]);
  t_variable *__world = &(variables[6]);
  // Logic
  __numHex = number_i32_make(255);
  __c1 = value_true;
  __c2 = value_false;
  __c3 = value_null;
  __obj = o_0x0();
  __hello = function_make_x(type_function, f_0x0, 0);
  __world = __hello;
  function_call_1(__world, number_i32_make(32));
  // After
  return module;
}

t_value *(*main_module)() = module_load
