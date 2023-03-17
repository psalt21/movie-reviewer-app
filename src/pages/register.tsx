import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/Form.module.css';
import { useState } from 'react';
import { useFormik } from 'formik';
import { validateSignup } from '@/lib/validate';

export default function Register() {
    const [ show, setShow ] = useState({ password: false, cpassword: false });
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: validateSignup,
        onSubmit
    });

    async function onSubmit(values: {}) {
        console.log(values);
    }

    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <section className='login-layout w-full mx auto flex items-center flex-col gap-10'>
                <div className='title text-center'>
                    <h1 className='text-gray-800 text-4xl font-bold py-4'>Movie Reviewer</h1>
                    <p className='mx-auto text-gray-400'>Create an account to start having fun!</p>
                </div>
                <form className='flex items-center flex-col gap-5' onSubmit={formik.handleSubmit}>
                    <section>    
                        <div className={`
                            ${styles.input_group}
                            ${formik.errors.username && formik.touched.username ?
                            'border-rose-600' :
                            ''}
                        `}>
                            <input
                                type='text'
                                placeholder='Username'
                                className={styles.input_text}
                                {...formik.getFieldProps('username')}
                            />
                        </div>
                        {formik.errors.username && formik.touched.username ?
                        <span className='text-rose-500 pl-2 text-xs'>{formik.errors.username}</span> :
                        <></>}
                    </section>
                    
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
                        <span className='text-rose-500 pl-2 text-xs'>{formik.errors.email}</span> :
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
                                type={`${show.password ? 'text': 'password'}`}
                                placeholder='Password'
                                className={styles.input_text}
                                {...formik.getFieldProps('password')}
                            />
                        </div>
                        {formik.errors.password && formik.touched.password ?
                            <span className='text-rose-500 pl-2 text-xs'>{formik.errors.password}</span> :
                            <></>}
                    </section>
                    
                    <section>
                        <div className={`
                            ${styles.input_group}
                            ${formik.errors.cpassword && formik.touched.cpassword ?
                            'border-rose-600' :
                            ''}
                        `}>
                            <input
                                type={`${show.cpassword ? 'text': 'password'}`}
                                placeholder='Confirm Password'
                                className={styles.input_text}
                                {...formik.getFieldProps('cpassword')}
                            />
                        </div>
                        {formik.errors.cpassword && formik.touched.cpassword ?
                        <span className='text-rose-500 pl-2 text-xs'>{formik.errors.cpassword}</span> :
                        <></>}
                    </section>

                    {/* login buttons */}
                    <div className='input-button'>
                        <button type='submit'>
                            Sign Me Up!
                        </button>
                    </div>
                </form>

                <p className='text-center text-gray-400'>
                    Already have an account? <Link href={'/login'}>Login</Link>
                </p>
            </section>
        </Layout>
    );
}
