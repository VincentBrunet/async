#include <runtime.h>

t_value *o_0x0(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 2, 107337, 3094754);
  t_variable *variables = object->data.object.variables;
  t_ref *__lol = &(variables[0]) /*107337*/;
  t_ref *__dudu = &(variables[1]) /*3094754*/;
  // Logic
  __dudu->value = number_i32_make(32);
  __lol->value = closure[0]->value;
  // After
  return object;
}

t_value *f_0x1(t_ref **closure, t_value *__num2) {
  // Logic
  function_call_3(closure[0]->value, closure[1]->value, __num2, closure[2]->value);
  // After
  return value_null;
}

t_value *f_0x0(t_ref **closure, t_value *__num) {
  // Variables
  t_ref *__f = ref_make(NULL);
  // Logic
  __f->value = function_make_x(type_function, &f_0x1, 3, closure[0], ref_make(__num), closure[1]);
  function_call_1(__f->value, __num);
  // After
  return value_null;
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 7, -1034389067, 3118, 3119, 3120, 109815, 99162322, 113318802);
  t_variable *variables = module->data.object.variables;
  t_ref *__numHex = &(variables[0]) /*-1034389067*/;
  t_ref *__c1 = &(variables[1]) /*3118*/;
  t_ref *__c2 = &(variables[2]) /*3119*/;
  t_ref *__c3 = &(variables[3]) /*3120*/;
  t_ref *__obj = &(variables[4]) /*109815*/;
  t_ref *__hello = &(variables[5]) /*99162322*/;
  t_ref *__world = &(variables[6]) /*113318802*/;
  // Logic
  __numHex->value = number_i32_make(255);
  __c1->value = value_true;
  __c2->value = value_false;
  __c3->value = value_null;
  __obj->value = object_call_x(&o_0x0, 1, __c3);
  __hello->value = function_make_x(type_function, &f_0x0, 2, __hello, __c3);
  __world->value = __hello->value;
  function_call_1(__world->value, number_i32_make(32));
  // After
  return module;
}

t_value *(*main_module)() = module_load
