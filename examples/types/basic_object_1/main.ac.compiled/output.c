#include <runtime.h>

t_value *o_0x0(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 2, 0x2CF24DBA5FB0A30E, 0xCB893729FEFFA2B3);
  t_variable *variables = object->data.object.variables;
  t_ref *__hello = &(variables[0]);
  t_ref *__bubu = &(variables[1]);
  // After
  return object;
}

t_value *o_0x1(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 0);
  t_variable *variables = object->data.object.variables;
  // After
  return object;
}

t_value *f_0x0(t_ref **closure) {
  // Logic
  return closure[0]->value;
  // After
  return null_make();
}

t_value *f_0x1(t_ref **closure) {
  // Variables
  t_ref *__hello = ref_make(NULL);
  // Logic
  return closure[0]->value;
  // After
  return null_make();
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 5, 0x0E07CF830957701D, 0x30936838B2B6EFA2, 0xCDCBB621A7F2B293, 0xDD3D1D46180E8504, 0xDF7ADC5142B4C5FA);
  t_variable *variables = module->data.object.variables;
  t_ref *__tt = &(variables[0]);
  t_ref *__myObject = &(variables[1]);
  t_ref *__myObject2 = &(variables[2]);
  t_ref *__factoryMyUnion = &(variables[3]);
  t_ref *__factoryMyObject = &(variables[4]);
  // Logic
  __myObject->value = object_call_x(&o_0x0, 0);
  __myObject2->value = object_call_x(&o_0x1, 0);
  __factoryMyObject->value = function_make_x(type_function, &f_0x0, 1, __myObject);
  __factoryMyUnion->value = function_make_x(type_function, &f_0x1, 1, __myObject);
  __tt->value = Is(__myObject->value/*{"kind":"Identifier","data":{"name":"MyObject","params":[{"kind":"Identifier","data":{"name":"Int","params":[],"token":{"begin":202,"end":203},"resolvedShorthand":{"kind":"Typedef","data":{"name":"Int","type":{"kind":"Primitive","data":{"id":"i32","params":[],"token":{"begin":7,"end":8}},"token":{"begin":7,"end":8}},"template":{"params":[],"token":{"begin":5,"end":5}},"token":{"begin":1,"end":8}}}},"token":{"begin":202,"end":203}}],"token":{"begin":200,"end":204},"resolvedShorthand":{"kind":"Typedef","data":{"name":"MyObject","type":{"kind":"Object","data":{"fields":[{"mutable":false,"name":"hello","hash":"0x2CF24DBA5FB0A30E","type":{"kind":"Identifier","data":{"name":"Int","params":[{"kind":"Identifier","data":{"name":"Int","params":[],"token":{"begin":25,"end":26},"resolvedShorthand":{"kind":"Typedef","data":{"name":"Int","type":{"kind":"Primitive","data":{"id":"i32","params":[],"token":{"begin":7,"end":8}},"token":{"begin":7,"end":8}},"template":{"params":[],"token":{"begin":5,"end":5}},"token":{"begin":1,"end":8}}}},"token":{"begin":25,"end":26}}],"token":{"begin":23,"end":27},"resolvedShorthand":{"kind":"Typedef","data":{"name":"Int","type":{"kind":"Primitive","data":{"id":"i32","params":[],"token":{"begin":7,"end":8}},"token":{"begin":7,"end":8}},"template":{"params":[],"token":{"begin":5,"end":5}},"token":{"begin":1,"end":8}}}},"token":{"begin":23,"end":27}},"token":{"begin":18,"end":27}},{"mutable":false,"name":"bubu","hash":"0xCB893729FEFFA2B3","type":{"kind":"Identifier","data":{"name":"Int","params":[],"token":{"begin":34,"end":35},"resolvedShorthand":{"kind":"Typedef","data":{"name":"Int","type":{"kind":"Primitive","data":{"id":"i32","params":[],"token":{"begin":7,"end":8}},"token":{"begin":7,"end":8}},"template":{"params":[],"token":{"begin":5,"end":5}},"token":{"begin":1,"end":8}}}},"token":{"begin":34,"end":35}},"token":{"begin":29,"end":35}}],"token":{"begin":16,"end":39}},"token":{"begin":16,"end":39}},"template":{"params":[],"token":{"begin":14,"end":14}},"token":{"begin":10,"end":39}}}},"token":{"begin":200,"end":204}}*/);
  // After
  return module;
}

t_value *(*entry_module)() = module_load;
