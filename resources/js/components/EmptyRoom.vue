<template>
    <div>
        <h2>Room Information</h2>
  
        <div>
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" id="title" v-model="room.title" required>
            </div>
    
            <div class="form-group">
                <label for="description">Description:</label>
                <div ref="quillContainer"></div>
                <!-- <textarea class="form-control d-none" id="description" v-model="room.description" required></textarea> -->
                <!-- <input type="hidden" v-model="room.description" required> -->
            </div>
    
            <div class="form-group">
                <label for="images">Images:</label>
                <input type="file" class="form-control-file" id="images" ref="imageInput" @change="handleImageUploadSecond" multiple required>
                <div class="image-preview">
                    <div v-for="(image, index) in room.images" :key="index" class="preview-item">
                        <img :src="image.url" class="img-thumbnail" alt="Preview Image">
                        <button class="btn btn-danger" @click="removeImage(index)">Remove</button>
                    </div>
                </div>
            </div>
    
            <button type="submit" class="btn btn-primary" @click="submitForm()">Submit</button>
        </div>
    </div>
</template>
  
<script>
    // import Quill from 'quill';
    import Quill from 'quill';
    import "quill/dist/quill.core.css";
    import "quill/dist/quill.bubble.css";
    import "quill/dist/quill.snow.css";
    // import Quill from 'quill/dist/quill.min.js';
  
    export default {
        name: 'RoomForm',
        data() {
            return {
                room: {
                    title: '',
                    description: '',
                    images: []
                },
                quill: null
            };
        },

        mounted() {
            this.initializeQuill();
        },

        methods: {
            initializeQuill() {
                this.quill = new Quill(this.$refs.quillContainer, {
                    theme: 'snow',
                    placeholder: 'Enter description...',
                    modules: {
                        toolbar: [
                            [{ header: [1, 2, 3, 4, false] }],
                            ['bold', 'italic', 'underline'],
                            ['link', 'image', 
                                {
                                    handler: this.handleImageUpload,
                                    maximumImageFileSize: 5 * 1024 * 1024, // Maximum file size in bytes (5MB in this example)
                                    maximumImageWidth: 2000, // Maximum image width in pixels
                                    maximumImageHeight: 2000, // Maximum image height in pixels
                                },
                            'video'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ color: [] }, { background: [] }],
                            [{ size: ['small', false, 'large', 'huge'] }],
                            [{ font: [] }],
                            [{ align: [] }],
                            [{ indent: '-1' }, { indent: '+1' }],
                            ['blockquote', 'code-block'],
                            ['strike', 'script'],
                            ['superscript', 'subscript'],
                            ['clean']
                        ]
                    },
                    spellcheck: false,
                });
                this.quill.on('text-change', this.handleQuillTextChange);
            },

            handleQuillTextChange() {
                this.room.description = this.quill.root.innerHTML;
            },

            handleImageUploadSecond(event) {
                const files = Array.from(event.target.files);
        
                files.forEach(file => {
                    const reader = new FileReader();
            
                    reader.onload = (event) => {
                        const imageData = {
                            file: file,
                            url: event.target.result
                        };
            
                        this.room.images.push(imageData);
                    };
            
                    reader.readAsDataURL(file);
                });
            },

            removeImage(index) {
                this.room.images.splice(index, 1);
            },

            submitForm() {
                // Perform form submission logic here
                // You can access the room data including the uploaded images and rich text description from this.room
                console.log(this.room);
            },
            handleImageUpload() {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                input.addEventListener('change', () => {
                const file = input.files[0];

                // Perform validation for file size and dimensions
                if (file.size > this.maximumImageFileSize) {
                    // Show error message for exceeding file size limit
                    return;
                }

                const img = new Image();
                img.src = URL.createObjectURL(file);

                img.onload = () => {
                    if (img.width > this.maximumImageWidth || img.height > this.maximumImageHeight) {
                    // Show error message for exceeding image dimensions
                    return;
                    }

                    // Handle the successful image upload
                    // You can use the appropriate method to insert the image into the editor
                    this.insertImageToEditor(img.src);

                    // Clean up the temporary URL created for the image preview
                    URL.revokeObjectURL(img.src);
                };
                });
            },

            insertImageToEditor(imageUrl) {
                const range = this.quill.getSelection(true);
                this.quill.insertEmbed(range.index, 'image', imageUrl);
                this.quill.setSelection(range.index + 1);
            },
        }
  };
  </script>
  
  <style scoped>
  
  </style>