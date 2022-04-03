#ifndef __ac_ref_strong_H
#define __ac_ref_strong_H

#include "runtime.hpp"

namespace ac {

template <typename T>
using RefStrong = std::shared_ptr<T>;

}  // namespace ac

#endif
