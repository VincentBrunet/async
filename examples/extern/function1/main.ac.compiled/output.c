#include <runtime.h>

t_value *o_0x0(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 2, 0x3E23E8160039594A, 0xCA978112CA1BBDCA);
  t_variable *variables = object->data.object.variables;
  t_ref *__b = (t_ref *)&(variables[0]);
  t_ref *__a = (t_ref *)&(variables[1]);
  // Logic
  __a->value = closure[0]->value;
  __b->value = closure[1]->value;
  // After
  return object;
}

t_value *f_0x0(t_ref **closure, t_value *__a, t_value *__b) {
  // Variables
  t_ref *__pb = ref_make(NULL);
  t_ref *__pa = ref_make(NULL);
  // Logic
  {
    printf("Hello, A:%d\n", __a->data.i32);
    printf("Hello, B:%d\n", __b->data.i32);
  };
  __pa->value = __a;
  __pb->value = __b;
  return object_call_x(&o_0x0, 2, __pa, __pb);
  // After
  return null_make();
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 4, 0x0E405B9869CEFA2C, 0x1D648848FD3C789C, 0x1DB7EFD18753FBF0, 0xEB759C75BAE1C8B6);
  t_variable *variables = module->data.object.variables;
  t_ref *__res1 = (t_ref *)&(variables[0]);
  t_ref *__res3 = (t_ref *)&(variables[1]);
  t_ref *__res2 = (t_ref *)&(variables[2]);
  t_ref *__my_print = (t_ref *)&(variables[3]);
  // Logic
  __my_print->value = function_make_x(type_function, &f_0x0, 0);
  __res1->value = function_call_2(__my_print->value, i32_make(1), i32_make(2));
  function_call_2(__my_print->value, object_read(__res1->value, 0x3E23E8160039594A)->value, object_read(__res1->value, 0xCA978112CA1BBDCA)->value);
  __res2->value = function_call_2(__my_print->value, i32_make(3), i32_make(4));
  function_call_2(__my_print->value, object_read(__res2->value, 0x3E23E8160039594A)->value, object_read(__res2->value, 0xCA978112CA1BBDCA)->value);
  __res3->value = function_call_2(__my_print->value, i32_make(5), i32_make(6));
  function_call_2(__my_print->value, object_read(__res3->value, 0x3E23E8160039594A)->value, object_read(__res3->value, 0xCA978112CA1BBDCA)->value);
  // After
  return module;
}

t_value *(*entry_module)() = module_load;
