import i18n from 'i18next';
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password mismatch': 'Password mismatch',
                Username: "Username",
                "Display Name": "Display Name",
                Password: "Password",
                "Password Repeat": "Password Repeat",
                "Login": "Login",
                "Logout": "Logout"
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Password mismatch': 'Şifreler Uyuşmuyor',
                Username: "Kullanıcı Adı",
                "Display Name": "Tercih Edilen İsim",
                Password: "Şifre",
                "Password Repeat": "Şifre Tekrar",
                "Login": "Giriş",
                "Logout": "Oturumu Kapat"
            }
        }
    },
    fallbackLng: 'tr', // default dili belirliyor.
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeperator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;