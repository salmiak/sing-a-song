<template lang="html">
  <div>
    <template v-if="profile">
      <!-- Profile Cover -->
      <v-parallax
        height="320"
        :src="profile.coverURL"
        class="secondary darken-3"
      >
        <v-toolbar flat color="transparent" dark class="flex-grow-0">
          <router-link to="/">
            <v-avatar size="32" class="mr-4">
              <svg
                class="appbar-logo"
                version="1.1"
                id="Lager_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <path
                    class="st0"
                    d="M268.4,403.8c-31.5,1.9-62.4-2.7-93.2-8.9c-6.4-1.3-11-0.1-16.1,3.7c-22.8,16.7-44.9,34.1-65,54.1 c-2.6,2.6-5.6,5.3-8.8,6.9c-7.6,3.7-14.3-0.7-14.5-9.1c-0.1-6.3,0.9-12.8,3.9-18.1c11-19.2,10.5-39.8,8.4-60.6 c-0.7-7.4-4.8-12-11.8-16.1c-19.7-11.2-38.4-24.1-51.7-43.1c-4.7-6.7-7.6-15-9.8-22.3c-4.1-13.3-8.2-26.9-9.5-41.2 c-1.5-16.7,1.6-32.2,5.5-48.1c6-24.2,21.1-42.3,38-59.3c5.8-5.9,11.5-12.1,17.2-18c7.9-8.2,17.4-15.1,26.8-21.7 c10.4-7.3,21.3-13.9,32.4-20.2c22.9-13,47.7-20.5,73.6-25.3c48.9-9.1,97.2-6.6,145.1,5.4c27.6,6.9,54.3,16.6,79.9,29.2 c29.1,14.3,50.5,36.1,65.9,64.2c8.2,15,15.5,30.3,22,46.1c1.6,3.8,2.5,8,3.1,12.1c5.1,32.2,0.7,63.7-12,93.2 c-14.7,34.1-42,55.3-76.1,69.6c-38.1,16.1-77.9,22.8-118.4,27.3C291.9,404.9,280.1,403.8,268.4,403.8z M298.8,199.6 c0-22.5,0.3-45-0.1-67.5c-0.2-10.2-4-12.7-14.6-12.3c-9,0.3-10.2,1.9-10.4,12.8c0,3.7,0,7.5,0.1,11.2c1.5,35.8-0.9,71.6-0.9,107.5 c0,9.2-0.6,9.7-9,7.3c-18.6-5.2-35.6-1.8-50.9,9.5c-20.5,15-18.6,30.5-2.1,45.3c1.8,1.6,4.1,2.8,6.3,4.1 c16.3,9.6,33.4,8.5,50.8,4.2c18.3-4.5,26.1-19.4,30.3-35c3.4-12.6,4.1-26.4,2.9-39.7C299.8,231.2,300.6,215.4,298.8,199.6z"
                  />
                </g>
              </svg>
            </v-avatar>
          </router-link>
          <v-toolbar-title>
            <router-link to="/" class="secondary--text text-decoration-none"
              >Sing a song</router-link
            >
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn :to="`/profile/${profile.id}`" outlined class="mr-2">
            <v-icon left>
              mdi-pen-off
            </v-icon>
            Lämna redigering
          </v-btn>

          <top-navigation />
        </v-toolbar>

        <v-container class="flex-grow-1 px-0 d-flex">
          <v-row>
            <v-col cols="12" class="d-flex justify-center align-center pb-12">
              <v-sheet
                color="white"
                elevation="3"
                rounded
                class="px-7 pt-7 text-center"
              >
                <v-file-input
                  class="mb-0 d-inline-flex mr-2"
                  style="width: 276px;"
                  v-model="coverFile"
                  :disabled="coverFile"
                  clearable
                  accept="image/*"
                  outlined
                  placeholder="Ladda upp ny omslagsbild"
                  dense
                >
                </v-file-input>

                <v-btn
                  v-if="profile.coverURL"
                  dark
                  color="accent"
                  @click="removeImg('cover')"
                  class="mb-3"
                >
                  <v-icon dark left>
                    mdi-delete
                  </v-icon>
                  Ta bort omslagsbild
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </template>

    <v-container class="pb-16">
      <!-- Profile details -->
      <template v-if="profile">
        <v-row justify="center">
          <v-col class="text-center">
            <v-avatar
              :size="profile.avatarURL ? 128 : 64"
              class="elevation-5"
              :class="{
                'mt-n13': !!profile.coverURL,
                'mt-4': !profile.coverURL,
              }"
              color="accent darken-1"
            >
              <img
                v-if="profile.avatarURL"
                :src="profile.avatarURL"
                :alt="profile.stageName || userName"
              />
              <span v-else class="white--text text-h5">
                {{
                  profile.stageName
                    ? profile.stageName.slice(0, 2)
                    : profile.user.firstName[0] + profile.user.lastName[0]
                }}
              </span>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="col-12 col-md-8 text-center">
            <v-file-input
              class="mb-0 d-inline-flex mr-2"
              style="width: 276px;"
              v-model="avatarFile"
              :disabled="avatarFile"
              clearable
              accept="image/*"
              outlined
              placeholder="Ladda upp ny profilbild"
              dense
            >
            </v-file-input>
            <v-btn
              style="top: -6px;"
              v-if="profile.avatarURL"
              dark
              color="accent"
              @click="removeImg('avatar')"
            >
              <v-icon dark left>
                mdi-delete
              </v-icon>
              Ta bort profilbild
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="col-12 col-sm-8">
            <v-expand-transition>
              <v-alert
                v-if="validation.message"
                :type="validation.type"
                class="text-left"
              >
                {{ validation.message }}
              </v-alert>
            </v-expand-transition>

            <inline-edit
              :model="profileName"
              @save="saveProfileName"
              label="Artistnamn"
            >
              <h1 class="text-center text-h3 mb-4">{{ profileName }}</h1>
            </inline-edit>

            <inline-edit
              :model="profile.description"
              @save="saveProfileDescription"
              label="Beskrivning"
              type="textarea"
              class="mb-3"
            >
              <vue-markdown v-if="profile.description" class="pa-3">
                {{ profile.description }}
              </vue-markdown>
              <p v-else class="font-italic text--disabled">
                Klicka här och skriv ett par rader om dig själv
              </p>
            </inline-edit>

            <p class="text-center text-caption mb-0">
              Vilka regioner kan du uppträda i?
            </p>
            <p class="text-center">
              <span>
                <v-chip
                  v-for="area in profile.geoReach"
                  :key="area"
                  class="ma-1"
                  color="accent"
                  close
                  close-icon="mdi-delete"
                  @click:close="removeArea(area)"
                >
                  {{ area }}
                </v-chip>
              </span>

              <v-menu max-height="256">
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    class="ma-1"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                  >
                    <v-icon left>
                      mdi-plus
                    </v-icon>
                    Lägg till område
                  </v-chip>
                </template>
                <v-list>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="area in notSelectedAreas"
                      :key="area"
                      @click="addArea(area)"
                    >
                      <v-list-item-title>{{ area }}</v-list-item-title>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </p>

            <inline-edit
              :model="profile.contactDetails"
              @save="saveProfileContactDetails"
              label="Kontaktuppgifter"
              type="textarea"
            >
              <vue-markdown v-if="profile.contactDetails" class="pa-3">
                {{ profile.contactDetails }}
              </vue-markdown>
              <p v-else class="font-italic text--disabled">
                Klicka för att ange kontaktuppgifter.
              </p>
            </inline-edit>
          </v-col>
        </v-row>

        <!-- Media -->
        <v-row>
          <v-col>
            <v-alert
              :color="newMediaValidation ? 'success' : 'info'"
              outlined
              text
              class="mt-0"
            >
              <v-text-field
                label="Lägga till media"
                placeholder="Klistra in för att lägga till media"
                :color="newMediaValidation ? 'success' : 'primary'"
                solo
                v-model="newMediaURL"
              >
                <template v-slot:append>
                  <v-btn
                    :disabled="!newMediaValidation"
                    color="primary"
                    @click="addNewMedia"
                  >
                    <v-icon left>mdi-plus</v-icon>
                    Lägg till
                  </v-btn>
                </template>
              </v-text-field>

              <v-expansion-panels
                class="mt-n4"
                flat
                hover
                v-if="!newMediaValidation"
              >
                <v-expansion-panel class="blue lighten-4">
                  <v-expansion-panel-header dark>
                    <div>
                      Klistra in en länk från YouTube, Spotify eller Soundcloud.
                      <span class="text-decoration-underline">Läs mer</span>
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-tabs v-model="helpTab">
                      <v-tab>
                        YouTube
                      </v-tab>
                      <v-tab>
                        Spotify
                      </v-tab>
                      <v-tab>
                        Soundcloud
                      </v-tab>
                      <v-tab>
                        Andra källor
                      </v-tab>
                    </v-tabs>
                    <v-card flat color="transparent">
                      <v-tabs-items v-model="helpTab">
                        <v-tab-item>
                          <v-card-text>
                            <h6 class="text-h6 mb-2">Film från YouTube</h6>
                            För att lägga till en film från YouTube så klistrar
                            du in webbadressen till filmens YouTube-sida. Den
                            hittar du längst upp i webbläsarfönstret när du
                            tittar på filmen på YouTube.
                          </v-card-text>
                        </v-tab-item>
                        <v-tab-item>
                          <v-card-text>
                            <h6 class="text-h6 mb-2">
                              Artist, låt, album eller spellista från Spotify
                            </h6>
                            I Spotify kan du vänsterklicka (cmd + klick på Mac)
                            på nästan vad som helst och få fram en meny. Under
                            <em>Dela</em> väljer du
                            <em>Kopiera Spotify-URI</em>. Sedan klistrar du in
                            här för att lägga till på din profil.
                          </v-card-text>
                        </v-tab-item>
                        <v-tab-item>
                          <v-card-text>
                            <h6 class="text-h6 mb-2">
                              Låt eller spellista från Soundcloud
                            </h6>
                            På spellistan eller låten i Soundcloud väljer du
                            <em>Share</em> (<em>Dela</em>) och i rutan som dyker
                            upp väljer du <em>Embed</em> (<em>Bädda in</em>).
                            Kopiera hela texten i rutan <em>Code</em> och
                            klistra in här för att lägga till på din profil.
                          </v-card-text>
                        </v-tab-item>
                        <v-tab-item>
                          <v-card-text>
                            <h6 class="text-h6 mb-2">
                              Skulle du vilja lägga till annan media?
                            </h6>
                            Vi vill alltid veta hur vi kan göra Sing a Song ännu
                            bättre. Skriv dina önskemål till oss.

                            <iframe
                              src="https://docs.google.com/forms/d/e/1FAIpQLScqmyKOihgnDy50mbP905EvWg7cxTcToAl9DLQNfuA-Nr5xlA/viewform?embedded=true"
                              width="640"
                              height="512"
                              frameborder="0"
                              marginheight="0"
                              marginwidth="0"
                              class="my-4"
                              style="width:100%"
                              >Loading…</iframe
                            >
                          </v-card-text>
                        </v-tab-item>
                      </v-tabs-items>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

              <v-alert
                v-if="newMediaValidation"
                type="success"
                class="mt-n4 mb-0"
              >
                Länken är en
                <strong
                  >{{ newMediaValidation.provider }}
                  {{
                    newMediaValidation.mediaType || newMediaValidation.type
                  }}</strong
                >.
              </v-alert>
            </v-alert>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col
            v-for="media in profile.media"
            :key="media.id"
            class="d-flex child-flex col-12 col-sm-6 col-md-4"
            style="position: relative"
          >
            <v-btn
              elevation="2"
              fab
              dark
              color="primary"
              absolute
              small
              style="top: 0px; right: 0px;"
              @click="deleteMedia(media)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <media-card :media="media" />
          </v-col>
        </v-row>

        <!--  / Media -->
      </template>

      <v-row v-else>
        <v-col>
          <p class="text-center text-h4 mt-16">Laddar…</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import spotifyUri from "spotify-uri";
  import urlParser from "js-video-url-parser";
  import VueMarkdown from "vue-markdown";
  import helpers from "@/_helpers";
  import allAreas from "@/_helpers/areas.js";
  import MediaCard from "@/components/MediaCard";
  import InlineEdit from "@/components/InlineEdit";

  export default {
    name: "Profile Edit",
    title() {
      return `Redigera ${this.profileName} | Sing a Song`;
    },
    components: {
      VueMarkdown,
      MediaCard,
      InlineEdit,
    },
    data() {
      return {
        helpTab: 0,
        newMediaURL: undefined,
        coverFile: undefined,
        avatarFile: undefined,
        validation: {},
        validationTimeout: undefined,
      };
    },
    created() {
      this.$store.dispatch("profiles/getAll");
    },
    watch: {
      profile() {
        if (
          this.profile &&
          this.profile.userId !== this.$store.state.authentication.user.id
        ) {
          this.$router.push("/");
        }
      },
      avatarFile(file) {
        if (!file) return false;
        this.updateImage(file, "avatar");
      },
      coverFile(file) {
        if (!file) return false;
        this.updateImage(file, "cover");
      },
      validation() {
        if (this.validationTimeout) {
          clearTimeout(this.validationTimeout);
          this.validationTimeout = undefined;
        }
        if (this.validation.message) {
          this.validationTimeout = setTimeout(() => {
            this.validation = {};
            this.validationTimeout = undefined;
          }, 10000);
        }
      },
    },
    computed: {
      id() {
        return this.$route.params.id;
      },
      profile() {
        if (!this.$store.state.profiles.all.items) return undefined;
        return this.$store.state.profiles.all.items.find(p => p.id == this.id);
      },
      profileName() {
        if (!this.$store.state.profiles.all.items) return undefined;
        return this.profile.stageName || this.userName;
      },
      profileSlug() {
        return helpers.slugify(this.profileName);
      },
      userName() {
        return this.profile.user.firstName + " " + this.profile.user.lastName;
      },
      notSelectedAreas() {
        if (!this.profile.geoReach) return allAreas;
        return allAreas.filter(
          area => this.profile.geoReach.indexOf(area) === -1
        );
      },
      newMediaValidation() {
        if (!this.newMediaURL) {
          return undefined;
        } else if (this.newMediaURL.search(".mp3") !== -1) {
          return {
            url: this.newMediaURL,
            provider: "mp3",
          };
        } else if (this.newMediaURL.search("spotify") !== -1) {
          return Object.assign(spotifyUri.parse(this.newMediaURL), {
            provider: "spotify",
          });
        } else {
          return urlParser.parse(this.newMediaURL);
        }
      },
      soundcloudValue() {
        if (this.newMediaValidation.provider !== "soundcloud") return undefined;

        let output = this.newMediaURL.split("src")[1].split('"')[1];
        return output;
      },
    },
    methods: {
      saveProfileName(newVal) {
        this.profile.stageName = newVal;
        this.updateProfile();
      },
      saveProfileDescription(newVal) {
        this.profile.description = newVal;
        this.updateProfile();
      },
      saveProfileContactDetails(newVal) {
        this.profile.contactDetails = newVal;
        this.updateProfile();
      },
      addArea(area) {
        this.profile.geoReach.push(area);
        this.profile.geoReach.sort();
        this.updateProfile();
      },
      removeArea(area) {
        this.profile.geoReach = this.profile.geoReach.filter(a => a !== area);
        this.profile.geoReach.sort();
        this.updateProfile();
      },
      updateProfile() {
        this.submitted = true;
        this.$store.dispatch("profiles/update", this.profile).then(
          () => {
            this.validation = {
              message: "Din profil uppdaterades",
              type: "success",
            };
            this.submitted = false;
          },
          error => {
            this.validation = {
              message: error,
              type: "error",
            };
            this.submitted = false;
          }
        );
      },
      updateImage(file, target) {
        const that = this;
        const currentUser = this.$store.state.authentication.user;

        this.$store.commit("pushLoading");

        function uploadFile(file, signedRequest, url) {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", signedRequest);
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                const payload = {
                  id: that.profile.id,
                  userId: currentUser.id,
                };
                if (target === "avatar") {
                  payload.avatarURL = url;
                } else if (target === "cover") {
                  payload.coverURL = url;
                } else {
                  console.error("missing target");
                }

                that.$store.dispatch("profiles/update", payload).then(
                  response => {
                    that.$store.commit("popLoading");
                    that.$store.commit("profiles/update", response);
                    that.avatarFile = null;
                    that.coverFile = null;
                    that.validation = {
                      message: "Din profil uppdaterades",
                      type: "success",
                    };
                  },
                  error => {
                    that.$store.commit("popLoading");
                    that.validation = {
                      message: error,
                      type: "error",
                    };
                  }
                );
              } else {
                this.$store.commit("popLoading");
                this.validation = {
                  message: "Något gick fel. Filen kunde inte laddas upp.",
                  type: "error",
                };
                console.error("Could not upload file.");
              }
            }
          };
          xhr.send(file);
        }

        this.removeImg(target).then(() => {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "GET",
            `${helpers.apiUrl}/sign-s3?file-name=${file.name}&file-type=${file.type}`
          );
          xhr.setRequestHeader(
            "Authorization",
            helpers.authHeader().Authorization
          );
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signedRequest, response.url);
              } else {
                console.error("Could not get signed URL.");
              }
            }
          };
          xhr.send();
        });
      },
      removeImg(target) {
        return new Promise((resolve, reject) => {
          if (this.profile[`${target}URL`] === "") {
            console.log("Ingen bild satt"); // eslint-disable-line no-console
            resolve();
          }

          const fileName = this.profile[`${target}URL`].split("/").pop();

          const xhr = new XMLHttpRequest();
          xhr.open("DELETE", `${helpers.apiUrl}/sign-s3/${fileName}`);
          xhr.setRequestHeader(
            "Authorization",
            helpers.authHeader().Authorization
          );
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                const payload = {
                  id: this.profile.id,
                  userId: this.$store.state.authentication.user.id,
                };

                if (target === "avatar") {
                  payload.avatarURL = "";
                } else if (target === "cover") {
                  payload.coverURL = "";
                } else {
                  console.error("missing target");
                }
                this.$store
                  .dispatch("profiles/update", payload)
                  .then(response => {
                    this.$store.commit("profiles/update", response);
                    this.validation = {
                      message: "Bilden raderad",
                      type: "success",
                    };
                    resolve();
                  });
              } else {
                this.validation = {
                  message: "Något gick fel",
                  type: "error",
                };
                reject();
              }
            }
          };
          xhr.send();
        });
      },
      addNewMedia() {
        if (!this.newMediaValidation) {
          return false;
        }
        this.mediaValidationError = undefined;
        this.submitted = true;

        this.$store
          .dispatch("media/add", {
            newMediaURL: this.soundcloudValue || this.newMediaURL,
            profileId: this.profile.id,
          })
          .then(
            media => {
              this.validation = {
                target: "media",
                message: "Media tillagt",
                type: "success",
              };
              this.submitted = false;
              this.newMediaURL = "";
              this.$store.commit("profiles/addMedia", media);
            },
            error => {
              this.validation = {
                target: "media",
                message: error,
                type: "error",
              };
              this.mediaValidationError = error;
            }
          );
      },
      deleteMedia(media) {
        this.$store.dispatch("media/remove", media).then(
          () => {
            this.$store.commit("profiles/deleteMedia", media);
          },
          error => {
            console.log(error); // eslint-disable-line no-console
          }
        );
      },
    },
  };
</script>

<style lang="css">
  .st0 {
    fill: var(--v-primary-base);
  }
  .theme--dark .st0 {
    fill: #fff;
  }
</style>
