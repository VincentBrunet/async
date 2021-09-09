#include <runtime.h>

t_value *f_0x0(t_ref **closure) {
  // After
  return value_null;
}

t_value *f_0x1(t_ref **closure) {
  // After
  return value_null;
}

t_value *o_0x0(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 4, 0x07123E1F482356C4, 0x2CF24DBA5FB0A30E, 0xACAC86C0E609CA90, 0xE3B98A4DA31A127D);
  t_variable *variables = object->data.object.variables;
  t_ref *__lol = &(variables[0]);
  t_ref *__hello = &(variables[1]);
  t_ref *__l = &(variables[2]);
  t_ref *__t = &(variables[3]);
  // Logic
  __l->value = closure[0]->value;
  __t->value = i32_make(42);
  __hello->value = function_make_x(type_function, &f_0x0, 0);
  __lol->value = function_make_x(type_function, &f_0x1, 0);
  // After
  return object;
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 3, 0x31F7A65E315586AC, 0x772A5FB04F9BAD38, 0xD192375885EC7D50);
  t_variable *variables = module->data.object.variables;
  t_ref *__toto = &(variables[0]);
  t_ref *__obj = &(variables[1]);
  t_ref *__cl = &(variables[2]);
  // Logic
  __toto->value = i32_make(42);
  __cl->value = object_call_x(&o_0x0, 1, __toto);
  __obj->value = function_call_0(object_read(__cl->value, 0xACAC86C0E609CA90)->value);
  // After
  return module;
}

t_value *(*main_module)() = module_load
