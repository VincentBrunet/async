#include <object_call.h>

t_value *object_call_0(t_value *(callable)(t_ref **)) {
  t_ref *closure[0];
  return callable(closure);
}

t_value *object_call_1(t_value *(callable)(t_ref **), t_ref *r1) {
  t_ref *closure[1];
  closure[0] = r1;
  return callable(closure);
}

t_value *object_call_2(t_value *(callable)(t_ref **), t_ref *r1, t_ref *r2) {
  t_ref *closure[2];
  closure[0] = r1;
  closure[1] = r2;
  return callable(closure);
}

t_value *object_call_3(t_value *(callable)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3) {
  t_ref *closure[3];
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  return callable(closure);
}

t_value *object_call_4(t_value *(callable)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4) {
  t_ref *closure[4];
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  return callable(closure);
}

t_value *object_call_5(t_value *(callable)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5) {
  t_ref *closure[5];
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  closure[4] = r5;
  return callable(closure);
}

t_value *object_call_6(t_value *(callable)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6) {
  t_ref *closure[6];
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  closure[4] = r5;
  closure[5] = r6;
  return callable(closure);
}

t_value *object_call_7(t_value *(callable)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7) {
  t_ref *closure[7];
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  closure[4] = r5;
  closure[5] = r6;
  closure[6] = r7;
  return callable(closure);
}

t_value *object_call_8(t_value *(callable)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7, t_ref *r8) {
  t_ref *closure[8];
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  closure[4] = r5;
  closure[5] = r6;
  closure[6] = r7;
  closure[7] = r8;
  return callable(closure);
}

t_value *object_call_9(t_value *(callable)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7, t_ref *r8, t_ref *r9) {
  t_ref *closure[9];
  closure[0] = r1;
  closure[1] = r2;
  closure[2] = r3;
  closure[3] = r4;
  closure[4] = r5;
  closure[5] = r6;
  closure[6] = r7;
  closure[7] = r8;
  closure[8] = r9;
  return callable(closure);
}

t_value *object_call_x(t_value *(callable)(t_ref **), t_u32 size, ...) {
  t_ref *closure[size];
  if (size > 0) {
    va_list rX;
    va_start(rX, size);
    for (t_u32 idx = 0; idx < size; idx++) {
      closure[idx] = va_arg(rX, t_ref *);
    }
    va_end(rX);
  }
  return callable(closure);
}
