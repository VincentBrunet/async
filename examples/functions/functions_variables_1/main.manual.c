#include <stdio.h>

#include "runtime.h"

void __0x22221()
{
  printf("1\n");
  //call(assert);
}

void __0x22222()
{
  printf("2\n");
  //call(assert);
}

typedef void (*t_fn_0x22221)();
typedef void (*t_fn_0x22222)();

void module() {
  t_fn_0x22221 a = __0x22221;
  t_fn_0x22222 b = __0x22222;
  a();
  b();
}

int main() {
  module();
}

t_object *module_0x333() {

}