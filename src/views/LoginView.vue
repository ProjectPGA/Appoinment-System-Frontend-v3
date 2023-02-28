<template>
  <section class="main-login">
    <button class="button button-translation is-danger">ES</button>
    <div class="column main-login_logo">
      <div class="container has-text-centered">
        <img
          src="../assets/img/logo.svg"
          class="logo"
          width="340"
          height="115"
        />
      </div>
    </div>
    <div class="columns is-centered is-mobile">
      <div class="column is-6-desktop is-10-mobile is-8-tablet container">
        <form>
          <h1 class="main-login__title title">Login</h1>
          <div class="field">
            <label class="label">E-Mail </label>
            <div class="control is-medium is-clearfix">
              <input type="email" placeholder="E-Mail" class="input is-medium"/>
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control password-input has-icons-right is-medium">
              <input type="password" placeholder="Password" class="input is-medium"/>
            </div>
          </div>
          <div class="main-login__button-section columns is-vcentered">
            <div class="column is-3 is-2-fullhd">
              <button type="button" disabled class="button is-medium is-danger is-outlined">Login</button>
            </div>
            <div class="column">
              <p>
                You dont have an account?<span class="main-login__invitation-link"
                  >Click here to redeem your invitational code.</span
                >
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.logo {
  height: 7.188rem;
  width: 21.25rem;
  cursor: pointer;
  @include mobile {
    width: 50%;
    height: 50%;
  }
}

.main-login {
  &_logo {
    margin-top: 3.12rem;
    margin-bottom: 3.12rem;
  }

  &__button-section{
    padding-top: 2.25rem;
  }

  &__invitation-link {
    cursor: pointer;
    color: $main-color !important;
    &:hover {
      text-decoration-line: underline;
    }
  }
}

.button-translation {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 1000;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  text-transform: uppercase;
}

.form-container {
  display: flex;
  justify-content: center;
}
</style>
