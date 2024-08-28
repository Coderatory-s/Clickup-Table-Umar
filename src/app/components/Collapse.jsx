"use client"
import React from 'react';
import { motion } from 'framer-motion';

const Collapse = ({ isOpen, children }) => {
  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0 }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export default Collapse;
