import { GlassPanel } from "./GlassPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "./LanguageProvider";
import { ExternalLink, Users, GraduationCap, TrendingUp, Shield, Heart } from "lucide-react";

const metrics = [
  { label: "Students Placed", value: "250+", description: "Successful university placements" },
  { label: "Success Rate", value: "92%", description: "Students accepted to their preferred universities" },
  { label: "Partner Universities", value: "50+", description: "Accredited institutions across Turkey" },
  { label: "Growth Rate", value: "80%", description: "Year-over-year student enrollment growth" }
];

const services = [
  {
    icon: GraduationCap,
    title: "University Selection",
    description: "Expert guidance to choose the perfect university and program based on your goals and qualifications."
  },
  {
    icon: Users,
    title: "Application Support",
    description: "Complete assistance with application processes, documentation, and requirements."
  },
  {
    icon: Shield,
    title: "Free Service Guarantee",
    description: "Students pay nothing - universities compensate us for successful placements."
  },
  {
    icon: Heart,
    title: "Ongoing Support",
    description: "Continued assistance throughout your academic journey in Turkey."
  }
];

const testimonials = [
  {
    name: "Sarah Ahmed",
    university: "Istanbul Technical University",
    program: "Computer Engineering",
    quote: "Thanks to Qobouli, I'm now studying my dream program at ITU. The process was seamless and completely free!"
  },
  {
    name: "Omar Hassan",
    university: "Boğaziçi University", 
    program: "Business Administration",
    quote: "Mohamed guided me through every step. I got accepted to my top choice university with a scholarship!"
  },
  {
    name: "Layla Mahmoud",
    university: "Middle East Technical University",
    program: "Architecture",
    quote: "The transparency and ethical approach of Qobouli made all the difference. Highly recommended!"
  }
];

export function QobouliSection() {
  const { t } = useLanguage();
  
  const handleLearnMore = () => {
    window.open('https://qobouli.com', '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/905380130948?text=Hello%20Mohamed%2C%20I%27m%20interested%20in%20Qobouli%20student%20registration%20services.', '_blank');
  };

  return (
    <section id="qobouli" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 glass-panel">
            <GraduationCap className="w-4 h-4 mr-2" />
            Student Registration Service
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-accent">Qobouli</span> - Your Gateway to Turkish Universities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ethical, transparent student registration services connecting international students 
            with top Turkish universities. Commission-based model means students pay nothing.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <GlassPanel key={index} className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">{metric.value}</div>
              <div className="font-medium mb-1">{metric.label}</div>
              <div className="text-sm text-muted-foreground">{metric.description}</div>
            </GlassPanel>
          ))}
        </div>

        {/* Mission Statement */}
        <GlassPanel className="p-8 mb-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            To democratize access to quality higher education by connecting international students 
            with the best Turkish universities through an ethical, transparent, and completely free service. 
            We believe education should be accessible to all, regardless of financial background.
          </p>
        </GlassPanel>

        {/* Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-8">How Qobouli Works</h3>
            <div className="space-y-6">
              {services.map((service, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{service.title}</h4>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-8">Success Stories</h3>
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <GlassPanel key={index} className="p-6">
                  <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-accent">{testimonial.program}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.university}</div>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>

        {/* Application Process */}
        <GlassPanel className="p-8 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Simple Application Process</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h4 className="font-semibold mb-2">Initial Consultation</h4>
              <p className="text-sm text-muted-foreground">Free consultation to understand your goals and qualifications</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h4 className="font-semibold mb-2">University Matching</h4>
              <p className="text-sm text-muted-foreground">We match you with the best universities for your profile</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h4 className="font-semibold mb-2">Application Support</h4>
              <p className="text-sm text-muted-foreground">Complete assistance with applications and documentation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
              <h4 className="font-semibold mb-2">Enrollment</h4>
              <p className="text-sm text-muted-foreground">Successful placement and ongoing support</p>
            </div>
          </div>
        </GlassPanel>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to Start Your Journey?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of successful students who have achieved their educational dreams through Qobouli. 
            Get started with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-liquid btn-accent px-8 py-4 text-lg"
              onClick={handleWhatsApp}
            >
              <Users className="w-5 h-5 mr-2" />
              {t('qobouli.getStarted')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-liquid px-8 py-4 text-lg"
              onClick={handleLearnMore}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              {t('button.learnAbout')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}