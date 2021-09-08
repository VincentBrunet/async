#include <closure_init.h>

void closure_init(t_closure *closure, t_u32 size)
{
  closure->size = size;
  if (size > 0)
  {
    closure->variables = calloc(size, sizeof(t_variable));
  }
}
