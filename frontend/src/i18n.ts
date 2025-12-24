import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  // Carrega as traduções de um backend (neste caso, a pasta /public/locales)
  .use(HttpApi)
  // Deteta a língua do utilizador a partir do navegador
  .use(LanguageDetector)
  // Passa a instância do i18n para a react-i18next
  .use(initReactI18next)
  // Inicializa o i18next
  .init({
    // Línguas suportadas
    supportedLngs: ['pt', 'en'],
    // Língua a usar caso a língua detetada não seja suportada
    fallbackLng: 'pt',
    // Opções para o language detector
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
    // Onde encontrar os ficheiros de tradução
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    // Opções para o react-i18next
    react: {
      // Usa o Suspense do React para o carregamento inicial das traduções
      useSuspense: true,
    },
  });

export default i18n;
