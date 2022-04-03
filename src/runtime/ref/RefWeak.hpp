#ifndef __ac_ref_weak_H
#define __ac_ref_weak_H

#include "runtime.hpp"

namespace ac {

template <typename T>
using RefWeak = std::weak_ptr<T>;

}  // namespace ac

#endif
