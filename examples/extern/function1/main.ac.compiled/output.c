#include <runtime.h>

t_value *f_0x0(t_ref **closure, t_value *__a, t_value *__b) {
  // Variables
  t_ref *__output = ref_make(NULL);
  // Logic
  { 
    printf("Hello, %d\n", __a->data.i32);
    printf("Hello, %d\n", __b->data.i32);
    __output->value = __a;
   };
  return __output->value;
  // After
  return null_make();
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 2, 0x6EEB55F76600D4AD, 0xEB759C75BAE1C8B6);
  t_variable *variables = module->data.object.variables;
  t_ref *__res = (t_ref *)&(variables[0]);
  t_ref *__my_print = (t_ref *)&(variables[1]);
  // Logic
  __my_print->value = function_make_x(type_function, &f_0x0, 0);
  __res->value = function_call_2(__my_print->value, i32_make(32), i32_make(1));
  function_call_2(__my_print->value, __res->value, i32_make(2));
  function_call_2(__my_print->value, __res->value, i32_make(3));
  // After
  return module;
}

t_value *(*entry_module)() = module_load;
