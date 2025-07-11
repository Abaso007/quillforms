<?php 
namespace QuillForms;
use QuillForms\Abstracts\Form_Template;
use QuillForms\Managers\Templates_Manager;

class Course_Evaluation_Survey_Template extends Form_Template {

    /**
     * Get template name
     *
     * @since @next
     *
     * @return string
     */
    public function get_name() {
        return 'course-evaluation-survey';
    }   

    /**
     * Get template title
     *
     * @since @next
     *
     * @return string
     */
    public function get_title() {
        return __( 'Course Evaluation Survey', 'quillforms' );
    }

    public function get_short_description() {
        return __( 'A survey to evaluate a course. This template includes a rating block and an opinion scale block.', 'quillforms' );
    }

    public function get_long_description() {
        return __( 'This template is designed to gather feedback on a course. It includes a rating block and an opinion scale block to help you collect valuable insights from your participants.', 'quillforms' );
    }
    /**
     * Get Template Link
     * 
     * @since @next
     */
    public function get_template_link() {
        return 'https://quillforms.com/forms/course-evaluation-survey/';
    }

    /**
     * Get Template Screenshot
     * 
     * @since @next
     */
    public function get_template_screenshot() {
        // screenshot.png is at the same folder of this file
        return QUILLFORMS_PLUGIN_URL . 'includes/templates/course-evaluation-survey/screenshot.png';
    }


    /**
     * Get template data
     * 
     * @since @next
     */

    public function get_template_data() {
        return json_decode(
            file_get_contents(
                QUILLFORMS_PLUGIN_DIR . 'includes/templates/course-evaluation-survey/template.json'
            ),
            true
        );
    }

    public function get_required_addons() {
        return array (
            'ratingblock',
            'opinionscaleblock',
        );
    }
}

Templates_Manager::instance()->register_template( new Course_Evaluation_Survey_Template() );