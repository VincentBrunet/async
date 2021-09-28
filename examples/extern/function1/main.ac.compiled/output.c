#include <runtime.h>

t_value *o_0x0(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 2, 0x3E23E8160039594A, 0xCA978112CA1BBDCA);
  t_field *fields = object->data.object.fields;
  t_ref *__b = (t_ref *)&(fields[0]);
  t_ref *__a = (t_ref *)&(fields[1]);
  // Logic
  __a->value = i32_substraction(i32_addition(closure[0]->value, i32_make(10)), closure[1]->value);
  __b->value = i32_addition(closure[1]->value, i32_make(10));
  // After
  return object;
}

t_value *f_0x0(t_ref **closure, t_value *__a, t_value *__b) {
  // Logic
  { 
    printf("Hello, A:%d\n", __a->data.i32);
    printf("Hello, B:%d\n", __b->data.i32);
   };
  return object_call_x(&o_0x0, 2, ref_make(__a), ref_make(__b));
  // After
  return null_make();
}

t_value *f_0x1(t_ref **closure) {
  // Logic
  closure[0]->value = closure[1]->value;
  // After
  return null_make();
}

t_value *o_0x1(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 2, 0x12EA12EACE7D655F, 0xEB759C75BAE1C8B6);
  t_field *fields = object->data.object.fields;
  t_ref *__change = (t_ref *)&(fields[0]);
  t_ref *__my_print = (t_ref *)&(fields[1]);
  // Logic
  __my_print->value = closure[0]->value;
  __change->value = function_make_x(type_function, &f_0x1, 2, closure[1], closure[2]);
  // After
  return object;
}

t_value *module_load() {
  // Variables
  t_ref *__dudu = ref_make(NULL);
  t_ref *__dada = ref_make(NULL);
  t_ref *__my_print = ref_make(NULL);
  t_ref *__res1 = ref_make(NULL);
  t_ref *__res2 = ref_make(NULL);
  t_ref *__res3 = ref_make(NULL);
  // Logic
  __dudu->value = import(str_make("https://google.com/didi/tutu.ac"));
  __dada->value = import(str_make("../hello"));
  __my_print->value = function_make_x(type_function, &f_0x0, 0);
  __res1->value = function_call_2(__my_print->value, i32_make(1), i32_make(2));
  function_call_2(__my_print->value, object_read(__res1->value, 0x3E23E8160039594A)->value, object_read(__res1->value, 0xCA978112CA1BBDCA)->value);
  __res2->value = function_call_2(__my_print->value, i32_make(3), i32_make(4));
  function_call_2(__my_print->value, object_read(__res2->value, 0x3E23E8160039594A)->value, object_read(__res2->value, 0xCA978112CA1BBDCA)->value);
  __res3->value = function_call_2(__my_print->value, i32_make(5), i32_make(6));
  function_call_2(__my_print->value, object_read(__res3->value, 0x3E23E8160039594A)->value, object_read(__res3->value, 0xCA978112CA1BBDCA)->value);
  return object_call_x(&o_0x1, 3, __my_print, __res1, __res2);
}

t_value *(*entry_module)() = module_load;
