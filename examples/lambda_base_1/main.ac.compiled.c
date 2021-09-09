#include <runtime.h>

t_value *o_0x0(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 2, 0x07123E1F482356C4, 0x4FC75659C5DAF27D);
  t_variable *variables = object->data.object.variables;
  t_ref *__lol = &(variables[0]);
  t_ref *__dudu = &(variables[1]);
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
  t_value *module = object_make_x(type_object, 7, 0x19A0FC8FD60BD0E9, 0x2CF24DBA5FB0A30E, 0x486EA46224D1BB4F, 0x772A5FB04F9BAD38, 0x7C1C97DF17C06692, 0x9C0ABE51C6E6655D, 0xD0F631CA1DDBA8DB);
  t_variable *variables = module->data.object.variables;
  t_ref *__numHex = &(variables[0]);
  t_ref *__hello = &(variables[1]);
  t_ref *__world = &(variables[2]);
  t_ref *__obj = &(variables[3]);
  t_ref *__c3 = &(variables[4]);
  t_ref *__c2 = &(variables[5]);
  t_ref *__c1 = &(variables[6]);
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
