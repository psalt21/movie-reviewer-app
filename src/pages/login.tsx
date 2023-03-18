import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/Form.module.css';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { validateLogin } from '@/lib/validate';
import { useRouter } from 'next/router';

interface FormValues {
    email?: string;
    password?: string;
}

export default function Login() {
    const router = useRouter();
    // Formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: validateLogin,
        onSubmit
    });

    async function onSubmit(values: FormValues) {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: '/'
        });

        if(status?.ok) {
            router.push(status.url);
        }
    }

    // Google Login
    async function handleGoogleSignin(){
        signIn('google', { callbackUrl: 'http://localhost:3000'});
    }
    
    // Github Login
    async function handleGithubSignin(){
        signIn('github', { callbackUrl: 'http://localhost:3000'});
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <section className='login-layout w-full mx auto flex items-center flex-col gap-10'>
                <div className='title text-center'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Movie Reviewer</h1>
                    <p className='mx-auto text-gray-400'>Login now to start exploring!</p>
                </div>
                <form 
                    className='flex items-center flex-col gap-5'
                    onSubmit={formik.handleSubmit}
                >
                    <section>
                        <div className={`
                            ${styles.input_group}
                            ${formik.errors.email && formik.touched.email ?
                            'border-rose-600' :
                            ''}
                        `}>
                            <input
                                type='email'
                                placeholder='Email'
                                className={styles.input_text}
                                {...formik.getFieldProps('email')}
                            />
                        </div>
                        {formik.errors.email && formik.touched.email ?
                            <span className='text-rose-400 pl-2 text-xs'>{formik.errors.email}</span> :
                            <></>}
                    </section>
                    
                    <section>
                        <div className={`
                            ${styles.input_group}
                            ${formik.errors.password && formik.touched.password ?
                            'border-rose-600' :
                            ''}
                        `}>
                            <input
                                type='password'
                                placeholder='Password'
                                className={styles.input_text}
                                {...formik.getFieldProps('password')}
                            />
                        </div>
                        {formik.errors.password && formik.touched.password ?
                            <span className='text-rose-400 pl-2 text-xs max-w-[50%]'>{formik.errors.password}</span> :
                            <></>}
                    </section>

                    {/* login buttons */}
                    <div className='input-button'>
                        <button type='submit'>
                            Login
                        </button>
                    </div>
                    <div className="input-button">
                        <button type='button' onClick={handleGoogleSignin}>
                            Sign In with Google
                        </button>
                    </div>
                    <div className="input-button">
                        <button type='button' onClick={handleGithubSignin}>
                            Sign In with GitHub
                        </button>
                    </div>
                </form>

                <p className='text-center text-gray-400'>
                    Don't have an account yet? <Link href={'/register'}>Sign Up</Link>
                </p>
            </section>
        </Layout>
    );
}
