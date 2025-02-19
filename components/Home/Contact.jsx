// biz-web-app/components/Home/Contact.jsx

"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

// Example icons from react-icons (AiOutlinePhone, AiOutlineMail)
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";

function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="py-10 mx-auto px-4 w-full max-w-7xl "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-center border-b border-gray-400 pb-2 max-w-7xl mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl capitalize"
        variants={itemVariants}
      >
        Contact Us
      </motion.h2>
      <div className="flex flex-col justify-center items-center w-full mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <motion.div variants={itemVariants} className="w-full">
            <Card className="dark:bg-black border border-gray-400/60 dark:border-neutral-700/60 rounded-3xl p-2 h-full">
              <CardHeader>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Contact Details
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <AiOutlinePhone className="w-6 h-6" />
                    <span className="text-sm sm:text-base">(123) 456-7890</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AiOutlineMail className="w-6 h-6" />
                    <Link
                      href="#"
                      prefetch={false}
                      className="text-sm sm:text-base hover:text-orange-500 transition-colors"
                    >
                      info@example.com
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <Card className="dark:bg-black border border-gray-400/60 dark:border-neutral-700/60 rounded-3xl p-2 h-full">
              <CardHeader>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Leave a Message
                </h3>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm sm:text-base">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className="border border-gray-400/60 dark:border-neutral-700/60 rounded-3xl p-2 pl-3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm sm:text-base">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      className="border border-gray-400/60 dark:border-neutral-700/60 rounded-3xl p-2 pl-3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm sm:text-base">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      className="min-h-[100px] border border-gray-400/60 dark:border-neutral-700/60 rounded-lg p-2 pl-3"
                    />
                  </div>

                  <Button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 rounded-full transition-colors">
                    Send message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;
