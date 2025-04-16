
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bot, Workflow, Database, MessageCircle } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/50">
        <CardHeader className="pb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ServiceCards: React.FC = () => {
  const services = [
    {
      icon: <Bot size={24} />,
      title: "Custom AI Agents",
      description:
        "Intelligent chatbots and AI assistants tailored to your business needs, with natural language processing and learning capabilities.",
      delay: 0.1,
    },
    {
      icon: <Workflow size={24} />,
      title: "Automation Workflows",
      description:
        "Streamline your operations with custom workflows powered by n8n and Zapier, reducing manual tasks and increasing efficiency.",
      delay: 0.2,
    },
    {
      icon: <Database size={24} />,
      title: "Data Intelligence",
      description:
        "Transform your data into actionable insights with smart dashboards, analytics, and automated reporting for spreadsheets and CRMs.",
      delay: 0.3,
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Integrations",
      description:
        "Seamlessly connect your AI assistants with Telegram, WhatsApp, email, calendars, and more to create a unified communication system.",
      delay: 0.4,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          icon={service.icon}
          title={service.title}
          description={service.description}
          delay={service.delay}
        />
      ))}
    </div>
  );
};

export default ServiceCards;
