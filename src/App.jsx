import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BubbleSort from './pages/BubbleSort'
import MergeSort from './pages/MergeSort'
import QuickSort from './pages/QuickSort'
import InsertionSort from './pages/InsertionSort'
import LinearSearch from './pages/LinearSearch'
import BinarySearch from './pages/BinarySearch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sorting/bubble-sort" element={<BubbleSort />} />
      <Route path="/sorting/merge-sort" element={<MergeSort />} />
      <Route path="/sorting/quick-sort" element={<QuickSort />} />
      <Route path="/sorting/insertion-sort" element={<InsertionSort />} />
      <Route path="/searching/linear-search" element={<LinearSearch />} />
      <Route path="/searching/binary-search" element={<BinarySearch />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App