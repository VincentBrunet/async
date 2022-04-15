#ifndef __function_HPP
#define __function_HPP

#include "core.hpp"

namespace ac {

template <typename TR>
struct callable0 {
  virtual TR call() = 0;
  virtual ~callable0(){};
};

template <typename TR, typename TP1>
struct callable1 {
  virtual TR call(TP1 p1) = 0;
  virtual ~callable1(){};
};

template <typename TR, typename TP1, typename TP2>
struct callable2 {
  virtual TR call(TP1 p1, TP2 p2) = 0;
  virtual ~callable2(){};
};

template <typename TR, typename TP1, typename TP2, typename TP3>
struct callable3 {
  virtual TR call(TP1 p1, TP2 p2, TP3 p3) = 0;
  virtual ~callable3(){};
};

template <typename TR, typename TP1, typename TP2, typename TP3, typename TP4>
struct callable4 {
  virtual TR call(TP1 p1, TP2 p2, TP3 p3, TP4 p4) = 0;
  virtual ~callable4(){};
};

template <typename TR>
using function0 = std::shared_ptr<callable0<TR> >;

template <typename TR, typename TP1>
using function1 = std::shared_ptr<callable1<TR, TP1> >;

template <typename TR, typename TP1, typename TP2>
using function2 = std::shared_ptr<callable2<TR, TP1, TP2> >;

template <typename TR, typename TP1, typename TP2, typename TP3>
using function3 = std::shared_ptr<callable3<TR, TP1, TP2, TP3> >;

template <typename TR, typename TP1, typename TP2, typename TP3, typename TP4>
using function4 = std::shared_ptr<callable4<TR, TP1, TP2, TP3, TP4> >;

}  // namespace ac

#endif
