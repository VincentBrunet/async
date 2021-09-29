#include <runtime.h>

t_value *f_0x1(t_ref **closure) {
  // Logic
  closure[0]->value = closure[1]->value;
  // After
  return null_make();
}

t_value *o_0x2(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 2, 0x12EA12EACE7D655F, 0xEB759C75BAE1C8B6);
  t_field *fields = object->data.object.fields;
  t_ref *__change = (t_ref *)&(fields[0]);
  t_ref *__my_print = (t_ref *)&(fields[1]);
  // Logic
  __my_print->value = object_read(closure[0]->value, 0xEB759C75BAE1C8B6)->value;
  __change->value = function_make_x(type_function, &f_0x1, 2, closure[1], closure[2]);
  // After
  return object;
}

t_value *module_load() {
  // Variables
  t_ref *__my_print = ref_make(NULL);
  t_ref *__res1 = ref_make(NULL);
  t_ref *__res2 = ref_make(NULL);
  t_ref *__res3 = ref_make(NULL);
  // Logic
  __my_print->value = import(str_make("./examples/extern/function1/my_print.ac"));
  __res1->value = function_call_2(object_read(__my_print->value, 0xEB759C75BAE1C8B6)->value, i32_make(1), i32_make(2));
  function_call_2(object_read(__my_print->value, 0xEB759C75BAE1C8B6)->value, object_read(__res1->value, 0x3E23E8160039594A)->value, object_read(__res1->value, 0xCA978112CA1BBDCA)->value);
  __res2->value = function_call_2(object_read(__my_print->value, 0xEB759C75BAE1C8B6)->value, i32_make(3), i32_make(4));
  function_call_2(object_read(__my_print->value, 0xEB759C75BAE1C8B6)->value, object_read(__res2->value, 0x3E23E8160039594A)->value, object_read(__res2->value, 0xCA978112CA1BBDCA)->value);
  __res3->value = function_call_2(object_read(__my_print->value, 0xEB759C75BAE1C8B6)->value, i32_make(5), i32_make(6));
  function_call_2(object_read(__my_print->value, 0xEB759C75BAE1C8B6)->value, object_read(__res3->value, 0x3E23E8160039594A)->value, object_read(__res3->value, 0xCA978112CA1BBDCA)->value);
  return object_call_x(&o_0x2, 3, __my_print, __res1, __res2);
}

t_value *(*entry_module)() = module_load;
