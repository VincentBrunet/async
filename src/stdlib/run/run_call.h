#ifndef __run_call_H
#define __run_call_H

#include <core/core_struct.h>

t_value *run_call_0(t_value *(type)(t_ref **));
t_value *run_call_1(t_value *(type)(t_ref **), t_ref *r1);
t_value *run_call_2(t_value *(type)(t_ref **), t_ref *r1, t_ref *r2);
t_value *run_call_3(t_value *(type)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3);
t_value *run_call_4(t_value *(type)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4);
t_value *run_call_5(t_value *(type)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5);
t_value *run_call_6(t_value *(type)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6);
t_value *run_call_7(t_value *(type)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7);
t_value *run_call_8(t_value *(type)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7, t_ref *r8);
t_value *run_call_9(t_value *(type)(t_ref **), t_ref *r1, t_ref *r2, t_ref *r3, t_ref *r4, t_ref *r5, t_ref *r6, t_ref *r7, t_ref *r8, t_ref *r9);

t_value *run_call_x(t_value *(type)(t_ref **), t_u32 size, ...);

#endif
