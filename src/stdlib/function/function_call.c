#include <function/function_call.h>

t_value *function_call_0(t_value *value) {
  return ((t_value * (*)(t_ref **)) value->data.function.callable)(
      value->data.function.closure);
}

t_value *function_call_1(t_value *value, t_value *p1) {
  return ((t_value * (*)(t_ref **, t_value *)) value->data.function.callable)(
      value->data.function.closure,
      p1);
}

t_value *function_call_2(t_value *value, t_value *p1, t_value *p2) {
  return ((t_value * (*)(t_ref **, t_value *, t_value *)) value->data.function.callable)(
      value->data.function.closure,
      p1,
      p2);
}

t_value *function_call_3(t_value *value, t_value *p1, t_value *p2, t_value *p3) {
  return ((t_value * (*)(t_ref **, t_value *, t_value *, t_value *)) value->data.function.callable)(
      value->data.function.closure,
      p1,
      p2,
      p3);
}

t_value *function_call_4(t_value *value, t_value *p1, t_value *p2, t_value *p3, t_value *p4) {
  return ((t_value * (*)(t_ref **, t_value *, t_value *, t_value *, t_value *)) value->data.function.callable)(
      value->data.function.closure,
      p1,
      p2,
      p3,
      p4);
}

t_value *function_call_5(t_value *value, t_value *p1, t_value *p2, t_value *p3, t_value *p4, t_value *p5) {
  return ((t_value * (*)(t_ref **, t_value *, t_value *, t_value *, t_value *, t_value *)) value->data.function.callable)(
      value->data.function.closure,
      p1,
      p2,
      p3,
      p4,
      p5);
}

t_value *function_call_6(t_value *value, t_value *p1, t_value *p2, t_value *p3, t_value *p4, t_value *p5, t_value *p6) {
  return ((t_value * (*)(t_ref **, t_value *, t_value *, t_value *, t_value *, t_value *, t_value *)) value->data.function.callable)(
      value->data.function.closure,
      p1,
      p2,
      p3,
      p4,
      p5,
      p6);
}

t_value *function_call_7(t_value *value, t_value *p1, t_value *p2, t_value *p3, t_value *p4, t_value *p5, t_value *p6, t_value *p7) {
  return ((t_value * (*)(t_ref **, t_value *, t_value *, t_value *, t_value *, t_value *, t_value *, t_value *)) value->data.function.callable)(
      value->data.function.closure,
      p1,
      p2,
      p3,
      p4,
      p5,
      p6,
      p7);
}

t_value *function_call_8(t_value *value, t_value *p1, t_value *p2, t_value *p3, t_value *p4, t_value *p5, t_value *p6, t_value *p7, t_value *p8) {
  return ((t_value * (*)(t_ref **, t_value *, t_value *, t_value *, t_value *, t_value *, t_value *, t_value *, t_value *)) value->data.function.callable)(
      value->data.function.closure,
      p1,
      p2,
      p3,
      p4,
      p5,
      p6,
      p7,
      p8);
}

t_value *function_call_9(t_value *value, t_value *p1, t_value *p2, t_value *p3, t_value *p4, t_value *p5, t_value *p6, t_value *p7, t_value *p8, t_value *p9) {
  return ((t_value * (*)(t_ref **, t_value *, t_value *, t_value *, t_value *, t_value *, t_value *, t_value *, t_value *, t_value *)) value->data.function.callable)(
      value->data.function.closure,
      p1,
      p2,
      p3,
      p4,
      p5,
      p6,
      p7,
      p8,
      p9);
}
