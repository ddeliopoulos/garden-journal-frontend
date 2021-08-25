<template>
  <div class="container">
    <div class="timeline">
      <div class="timeline-container primary">
        <div class="timeline-icon">
          <i class="far fa-grin-wink"></i>
        </div>
        <div class="timeline-body">
          <h4 class="timeline-title"><span class="badge">Primary</span></h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam necessitatibus numquam earum ipsa fugiat veniam suscipit, officiis repudiandae, eum recusandae neque dignissimos. Cum fugit laboriosam culpa, repellendus esse commodi deserunt.</p>
          <p class="timeline-subtitle">1 Hours Ago</p>
        </div>
      </div>
    </div>
  </div>



  <div class="modal">
    <label class="modal__label" for="modal__checkbox">

      <div class="image-cropper">
        <img alt="test" src="https://cdn.dribbble.com/users/1810157/screenshots/14012338/image.png"/>
      </div>

    </label>
    <input class="modal__checkbox" id="modal__checkbox" type="checkbox">
    <div class="modal__window">
      <div class="modal__content">
        <label class="modal__close-icon" for="modal__checkbox"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
          <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
        </svg></label>
        <input class="modal__checkbox" id="modal__checkbox" type="checkbox">
        <img src="https://cdn.dribbble.com/users/1810157/screenshots/14012338/image.png" />
      </div>
    </div>
  </div>
</template>

<script>

export default {

}
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Niramit:300,300i,700');
body {
  background: linear-gradient(to right, #7f53ac 0, #657ced 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.image-cropper {
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  margin: auto;
}

img {
  max-width: 100%;
}

.modal {
  width: 155px;
  height: 115px;
  background: green;
  transition: 1s;

  &__checkbox {
    display: none;

    &:checked ~ div {
      visibility: visible;
      opacity: 1;
    }
  }

  &__label {
    text-decoration: underline;
    cursor: pointer;
  }

  &__window {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    visibility: hidden;
    opacity: 0;
    transition: 1s;
  }

  &__content {
    max-width: 576px;
    background: white;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    padding: 2rem;
    border-radius: 1rem;
  }

  &__close-icon {
    cursor: pointer;
    width: 1.5rem;
    margin: 0 0.5rem;
    position: absolute;
    right: 0;
    top: 0;
    color: #657ced;
  }
}






//journal entry
// reset some browser default styles
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// colors
$primary: #1d8cf8;
$secondary: #4f537b;
$info: #11cdef;
$success: #00bf9a;
$warning: #ff8d72;
$danger: #fd5d93;

// timeline variables
$body-bg: #1e1e2f;
$timeline-before-bg : #222a42;
$timeline-body-bg: #27293d;
$timeline-body-round: 3px;
$timeline-body-shadow: 1px 3px 9px rgba(0,0,0, .1);

body {
  font-family: 'K2D', sans-serif;
  background: $body-bg;
  letter-spacing: 1px;
}

// page container
.container {
  max-width: 650px;
  margin: 50px auto;
}

// typography
p {
  font-weight: 300;
  line-height: 1.5;
  font-size: 14px;
  opacity: .8;
}

// timeline style
.timeline {
  position: relative;
  padding-left: 4rem;
  margin: 0 0 0 30px;
  color: white;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: $timeline-body-bg;
  }

  .timeline-container {
    position: relative;
    margin-bottom: 2.5rem;;

    .timeline-icon {
      position: absolute;
      left: -88px;
      top: 4px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      text-align: center;
      font-size: 2rem;
      background: $secondary;

      i {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .timeline-body {
      background: $timeline-body-bg;
      border-radius: $timeline-body-round;
      padding: 20px 20px 15px;
      box-shadow: $timeline-body-shadow;

      &:before {
        content: '';
        background: inherit;
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        left: -10px;
        transform: rotate(45deg);
        border-radius: 0 0 0 2px;
      }

      .timeline-title {
        margin-bottom: 1.4rem;

        .badge {
          background: $secondary;
          padding: 4px 8px;
          border-radius: 3px;
          font-size: 12px;
          font-weight: bold;
        }
      }

      .timeline-subtitle {
        font-weight: 300;
        font-style: italic;
        opacity: .4;
        margin-top: 16px;
        font-size: 11px;
      }
    }

    // Primary Timeline
    &.primary {
      .badge,
      .timeline-icon {
        background: $primary !important;
      }
    }

    // Info Timeline
    &.info {
      .badge,
      .timeline-icon {
        background: $info !important;
      }
    }

    // Success Timeline
    &.success {
      .badge,
      .timeline-icon {
        background: $success !important;
      }
    }

    // Warning Timeline
    &.warning {
      .badge,
      .timeline-icon {
        background: $warning !important;
      }
    }

    // Dnager Timeline
    &.danger {
      .badge,
      .timeline-icon {
        background: $danger !important;
      }
    }

  }
}



</style>