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
  t_variable *hello;
  t_variable *world;
  num = 42;
  hello = (t_function)(f_0x0);
  world = hello;
  (world)();
}

