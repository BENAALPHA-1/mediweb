import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-blue-600"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        About MediChain
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 mb-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Connecting Communities to Trusted Chemists
      </motion.p>

      <motion.div
        className="text-gray-600 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <p>
          MediChain is a modern platform designed to bridge the gap between users
          and trusted chemists. Whether you’re searching for a specific medication
          or exploring available drugs in your area, MediChain ensures you get
          accurate information directly from certified clients.
        </p>

        <p>
          We empower local chemists to manage their drug inventories seamlessly
          while giving users a transparent view of available medicines and their
          purposes. Clients can easily add and update their listings, ensuring the
          data is fresh and reliable.
        </p>

        <p>
          With built-in role-based access control, MediChain ensures that users,
          clients, and admins each have the right tools to make healthcare more
          accessible, trustworthy, and efficient.
        </p>

        <p>
          Our mission is to simplify access to medication while supporting the
          hardworking chemists who serve our communities. MediChain is built with
          security, accuracy, and ease of use in mind — because when it comes to
          healthcare, trust is everything.
        </p>
      </motion.div>

      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Our Vision</h2>
        <p className="text-gray-700">
          A future where everyone has instant access to trusted medical resources,
          wherever they are.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
