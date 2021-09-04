#ifndef __CLOSURES_H
#define __CLOSURES_H

#include "types.h"

/**
 * Global utils
 */

void closure_init(t_closure *closure, t_u32 size);

t_variable *closure_get(t_closure *closure, t_u32 key);

#endif
