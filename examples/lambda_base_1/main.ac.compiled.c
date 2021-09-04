#include "runtime.h"

t_value *f_0x1(){
  (log)();
}

t_value *f_0x0(){
  t_variable *f;
  f = (t_function)(f_0x1);
  (f)();
}

t_value *module_load(){
  t_variable *num;
  t_variable *numHex;
  t_variable *c1;
  t_variable *c2;
  t_variable *c3;
  t_variable *hello;
  t_variable *world;
  num = value_factory_i32(42);
  numHex = value_factory_i32(255);
  c1 = value_true;
  c2 = value_false;
  c3 = value_null;
  hello = (t_function)(f_0x0);
  world = hello;
  (world)();
}

