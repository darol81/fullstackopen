                    <div>
                        <h2>Log in to application</h2>
                        <form onSubmit={handleLogin}>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" onChange={({ target }) => setUsername(target.value)} required/><br/>

                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" onChange={({ target }) => setPassword(target.value)} required/><br/>

                            <button type="submit">Login</button>
                        </form> 
                        <Notification message={notificationMsg}></Notification>
                    </div>
                );
