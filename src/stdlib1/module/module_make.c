#include <module/module_make.h>
#include <value/value_make.h>

t_ref **module_make(t_u32 size) {
  if (size > 0) {
    return calloc(size, sizeof(t_ref *));
  }
  return NULL;
}

t_ref **module_make_0() {
  t_ref **exports = module_make(0);
  return exports;
}

t_ref **module_make_1(t_ref *e1) {
  t_ref **exports = module_make(1);
  exports[0] = e1;
  return exports;
}

t_ref **module_make_2(t_ref *e1, t_ref *e2) {
  t_ref **exports = module_make(2);
  exports[0] = e1;
  exports[1] = e2;
  return exports;
}

t_ref **module_make_3(t_ref *e1, t_ref *e2, t_ref *e3) {
  t_ref **exports = module_make(3);
  exports[0] = e1;
  exports[1] = e2;
  exports[2] = e3;
  return exports;
}

t_ref **module_make_4(t_ref *e1, t_ref *e2, t_ref *e3, t_ref *e4) {
  t_ref **exports = module_make(4);
  exports[0] = e1;
  exports[1] = e2;
  exports[2] = e3;
  exports[3] = e4;
  return exports;
}

t_ref **module_make_5(t_ref *e1, t_ref *e2, t_ref *e3, t_ref *e4, t_ref *e5) {
  t_ref **exports = module_make(5);
  exports[0] = e1;
  exports[1] = e2;
  exports[2] = e3;
  exports[3] = e4;
  exports[4] = e5;
  return exports;
}

t_ref **module_make_6(t_ref *e1, t_ref *e2, t_ref *e3, t_ref *e4, t_ref *e5, t_ref *e6) {
  t_ref **exports = module_make(6);
  exports[0] = e1;
  exports[1] = e2;
  exports[2] = e3;
  exports[3] = e4;
  exports[4] = e5;
  exports[5] = e6;
  return exports;
}

t_ref **module_make_7(t_ref *e1, t_ref *e2, t_ref *e3, t_ref *e4, t_ref *e5, t_ref *e6, t_ref *e7) {
  t_ref **exports = module_make(7);
  exports[0] = e1;
  exports[1] = e2;
  exports[2] = e3;
  exports[3] = e4;
  exports[4] = e5;
  exports[5] = e6;
  exports[6] = e7;
  return exports;
}

t_ref **module_make_8(t_ref *e1, t_ref *e2, t_ref *e3, t_ref *e4, t_ref *e5, t_ref *e6, t_ref *e7, t_ref *e8) {
  t_ref **exports = module_make(8);
  exports[0] = e1;
  exports[1] = e2;
  exports[2] = e3;
  exports[3] = e4;
  exports[4] = e5;
  exports[5] = e6;
  exports[6] = e7;
  exports[7] = e8;
  return exports;
}

t_ref **module_make_9(t_ref *e1, t_ref *e2, t_ref *e3, t_ref *e4, t_ref *e5, t_ref *e6, t_ref *e7, t_ref *e8, t_ref *e9) {
  t_ref **exports = module_make(9);
  exports[0] = e1;
  exports[1] = e2;
  exports[2] = e3;
  exports[3] = e4;
  exports[4] = e5;
  exports[5] = e6;
  exports[6] = e7;
  exports[7] = e8;
  exports[8] = e9;
  return exports;
}

t_ref **module_make_x(t_u32 size, ...) {
  t_ref **exports = module_make(size);
  if (size > 0) {
    va_list rX;
    va_start(rX, size);
    for (t_u32 idx = 0; idx < size; idx++) {
      exports[idx] = va_arg(rX, t_ref *);
    }
    va_end(rX);
  }
  return exports;
}
