#include <runtime.h>

t_value *o_0x0(t_closure *closure)
{
  // Variables
  t_value *object = object_make_x(type_object, 2, /*lol*/ 107337, /*dudu*/ 3094754);
  t_variable *variables = object->content.object.variables;
  t_variable *__lol = &(variables[0]) /*107337*/;
  t_variable *__dudu = &(variables[1]) /*3094754*/;
  // Logic
  __dudu->value = number_i32_make(32);
  __lol->value = closure_variable(closure, /*c3*/ 3120)->value;
  // After
  return object;
}

t_value *f_0x1(t_closure *closure, t_value *__num2)
{
  // Logic
  function_call_3(closure_variable(closure, /*hello*/ 99162322)->value, closure_variable(closure, /*num*/ 109446)->value, __num2, closure_variable(closure, /*c3*/ 3120)->value);
  // After
  return value_null;
}

t_value *f_0x0(t_closure *closure, t_value *__num)
{
  // Variables
  t_variable *__f = variable_make(102, NULL);
  // Logic
  __f->value = function_make_x(type_function, f_0x1, 3, closure_variable(closure, /*hello*/ 99162322), variable_make( /*num*/ 109446, __num), closure_variable(closure, /*c3*/ 3120));
  function_call_1(__f, __num);
  // After
  return value_null;
}

t_value *module_load()
{
  // Variables
  t_value *module = object_make_x(type_object, 7, /*numHex*/ -1034389067, /*c1*/ 3118, /*c2*/ 3119, /*c3*/ 3120, /*obj*/ 109815, /*hello*/ 99162322, /*world*/ 113318802);
  t_variable *variables = module->content.object.variables;
  t_variable *__numHex = &(variables[0]) /*-1034389067*/;
  t_variable *__c1 = &(variables[1]) /*3118*/;
  t_variable *__c2 = &(variables[2]) /*3119*/;
  t_variable *__c3 = &(variables[3]) /*3120*/;
  t_variable *__obj = &(variables[4]) /*109815*/;
  t_variable *__hello = &(variables[5]) /*99162322*/;
  t_variable *__world = &(variables[6]) /*113318802*/;
  // Logic
  __numHex->value = number_i32_make(255);
  __c1->value = value_true;
  __c2->value = value_false;
  __c3->value = value_null;
  __obj->value = object_call_x(o_0x0, 1, __c3);
  __hello->value = function_make_x(type_function, f_0x0, 2, __hello, __c3);
  __world->value = __hello;
  function_call_1(__world, number_i32_make(32));
  // After
  return module;
}

t_value *(*main_module)() = module_load
