#ifndef __object_call_H
#define __object_call_H

#include <types.h>

t_value *object_call_0(t_value *(type)(t_closure *));
t_value *object_call_1(t_value *(type)(t_closure *), t_variable *d1);
t_value *object_call_2(t_value *(type)(t_closure *), t_variable *d1, t_variable *d2);
t_value *object_call_3(t_value *(type)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3);
t_value *object_call_4(t_value *(type)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4);
t_value *object_call_5(t_value *(type)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5);
t_value *object_call_6(t_value *(type)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6);
t_value *object_call_7(t_value *(type)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7);
t_value *object_call_8(t_value *(type)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7, t_variable *d8);
t_value *object_call_9(t_value *(type)(t_closure *), t_variable *d1, t_variable *d2, t_variable *d3, t_variable *d4, t_variable *d5, t_variable *d6, t_variable *d7, t_variable *d8, t_variable *d9);

t_value *object_call_x(t_value *(type)(t_closure *), t_u32 size, ...);

#endif
