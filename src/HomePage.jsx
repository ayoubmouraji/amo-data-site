import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Card = ({ children }) => (
  <div className="bg-white rounded-lg shadow-md p-6">{children}</div>
);
const CardContent = ({ children }) => <div>{children}</div>;

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
  >
    {children}
  </button>
);

const Input = (props) => (
  <input
    {...props}
    className="border border-gray-300 rounded px-4 py-2 w-full"
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className="border border-gray-300 rounded px-4 py-2 w-full"
  />
);

export default function HomePage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    try {
      const response = await fetch("https://amo-data-backend.onrender.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (response.ok) {
        setSent(true);
        setStatus("Message envoyé avec succès !");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(result.message || "Erreur lors de l'envoi.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setStatus("Erreur serveur. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 w-full bg-white shadow z-50">
        <nav className="flex items-center justify-between px-6 py-4">
          <span className="font-bold text-xl">AMO DATA & IA</span>
          <div className="space-x-4 hidden md:flex">
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#about" className="hover:text-blue-600">À propos</a>
            <a href="#projects" className="hover:text-blue-600">Réalisations</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>
        </nav>
      </header>

      <section className="relative flex items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-gray-900 text-white pt-20" data-aos="fade-zoom-in">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6">AMO DATA & IA</h1>
          <p className="text-xl mb-8">Transformez vos données en intelligence.</p>
          <Button className="text-lg">Découvrir nos services</Button>
        </motion.div>
      </section>
      <section id="services" className="py-16 bg-gray-100 text-gray-800">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">Nos Services</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          title: "Data Engineering",
          description: "Mettez en place des pipelines de données robustes et scalables pour tirer pleinement parti de vos sources de données internes et externes."
        },
        {
          title: "Machine Learning",
          description: "Exploitez la puissance des algorithmes prédictifs pour automatiser vos décisions, anticiper les comportements et améliorer vos performances."
        },
        {
          title: "Automatisation IA",
          description: "Réduisez vos coûts et vos erreurs humaines en automatisant vos processus métiers à l'aide d'outils intelligents et personnalisés."
        },
        {
          title: "Création de logiciels sur-mesure",
          description: "Nous développons des solutions logicielles adaptées à vos besoins, avec une ergonomie moderne et des performances optimales."
        },
        {
          title: "Conseil",
          description: "Profitez d’un accompagnement stratégique et opérationnel pour structurer vos projets Data & IA et accélérer votre transformation numérique."
        }
      ].map((service, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Card className="hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p>{service.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      <section id="about" className="py-16 bg-white text-gray-800" data-aos="fade-left">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Qui sommes-nous ?</h2>
          <p className="max-w-4xl mx-auto text-center">
            AMO DATA & IA est née de la passion pour les données et l'innovation. Notre mission est de rendre l'intelligence artificielle accessible et créatrice de valeur pour toutes les entreprises. Nous privilégions l'excellence technique et l'accompagnement sur-mesure.
          </p>
        </div>
      </section>

      <section id="projects" className="py-16 bg-gray-100 text-gray-800">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-8">Nos Réalisations</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {[
        {
          title: "Optimisation Big Data pour une banque",
          description:
            "Migration d'une infrastructure legacy vers une plateforme Big Data moderne. Résultat : amélioration de la détection de fraude de +40% grâce à un moteur de scoring temps réel alimenté par des données multicanal."
        },
        {
          title: "Automatisation IA pour un e-commerce",
          description:
            "Déploiement d’un moteur de recommandation basé sur le comportement d’achat et le machine learning. Résultat : hausse de 25% du panier moyen et réduction du churn client de 30%."
        }
      ].map((proj, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
          data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
        >
          <Card className="hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">{proj.title}</h3>
              <p>{proj.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      <section id="contact" className="py-16 bg-white text-gray-800" data-aos="zoom-in">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Contactez-nous</h2>
          <div className="max-w-2xl mx-auto">
            {sent && <p className="text-green-600 text-center mb-4">Message envoyé !</p>}
            {status && <p className="text-red-600 text-center mb-4">{status}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <Input type="text" name="name" placeholder="Votre nom" value={form.name} onChange={handleChange} required />
              <Input type="email" name="email" placeholder="Votre email" value={form.email} onChange={handleChange} required />
              <Textarea name="message" placeholder="Votre message" rows={5} value={form.message} onChange={handleChange} required />
              <Button type="submit" className="text-lg">Envoyer</Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 AMO DATA & IA. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-400">Mentions légales</a>
            <a href="#" className="hover:text-blue-400">Politique de confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
