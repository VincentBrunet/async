#ifndef __runtime_HPP
#define __runtime_HPP

#include "core.hpp"
#include "function.hpp"
#include "object.hpp"
#include "primitive.hpp"
#include "string.hpp"

namespace ac {

extern void *(*entry_module)();

}  // namespace ac

#endif
