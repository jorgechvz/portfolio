import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import ContactForm from "../contact/contact-form";
import ContactInfo from "../contact/contact-info";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  // Contact info items
  const contactItems = [
    {
      icon: <Mail className="h-6 w-6 text-purple-500" />,
      title: "Email",
      value: "alex@aiengineering.dev",
      link: "mailto:alex@aiengineering.dev",
    },
    {
      icon: <Phone className="h-6 w-6 text-purple-500" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-500" />,
      title: "Location",
      value: "San Francisco, CA",
      link: "https://maps.google.com/?q=San+Francisco,CA",
    },
  ];

  // Social media links
  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      name: "GitHub",
      url: "https://github.com",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      name: "LinkedIn",
      url: "https://linkedin.com",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      name: "Twitter",
      url: "https://twitter.com",
    },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-20 md:py-32 bg-slate-50/50 dark:bg-slate-900/50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div style={{ opacity, y }} className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Let's{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Collaborate
            </span>
          </motion.h2>

          <motion.p
            className="text-slate-700 dark:text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I'm open to new opportunities, collaborations, and interesting
            projects. Don't hesitate to reach out to discuss how we can work
            together!
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-purple-500/5 border border-purple-100 dark:border-purple-900/20">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-6">
                {contactItems.map((item, index) => (
                  <ContactInfo
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    value={item.value}
                    link={item.link}
                  />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                  Follow me on
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 dark:bg-slate-700 p-3 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability card */}
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl shadow-purple-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4">Current Availability</h3>
              <p className="mb-2">
                Open to new opportunities and interesting projects.
              </p>
              <p className="text-purple-200">Response time: 24-48 hours</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
