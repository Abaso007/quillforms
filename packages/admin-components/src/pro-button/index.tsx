// ProButton.tsx
import { NavLink } from '@quillforms/navigation';
import ConfigApi from '@quillforms/config';
import { css } from 'emotion';
import { __ } from '@wordpress/i18n';

interface ProButtonProps {
    addonSlug: string;
    className?: string;
}

const ProButton = ({ addonSlug, className = '' }: ProButtonProps) => {
    const license = ConfigApi.getLicense();
    const addon = ConfigApi.getStoreAddons()[addonSlug];
    const isWPEnv = ConfigApi.isWPEnv();
    const featurePlanLabel = ConfigApi.getPlans()[addon.plan].label;
    const isPlanAccessible = ConfigApi.isPlanAccessible(addon.plan);

    let actionText = '';
    let actionLink = '';
    let isExternalLink = true;

    // Determine action based on status
    if (isWPEnv && addon.is_installed) {
        if (addon.is_active) {
            if (license?.status !== 'valid') {
                actionText = __('Renew License', 'quillforms');
                actionLink = 'https://quillforms.com';
            } else if (!isPlanAccessible) {
                actionText = __('Upgrade to', 'quillforms') + ` ${featurePlanLabel}`;
                actionLink = 'https://quillforms.com';
            }
        } else {
            actionText = __('Activate Addon', 'quillforms');
            actionLink = '/admin.php?page=quillforms&path=addons';
            isExternalLink = false;
        }
    } else {
        if (license?.status === 'valid' && isPlanAccessible) {
            actionText = __('Install Addon', 'quillforms');
            actionLink = '/admin.php?page=quillforms&path=addons';
            isExternalLink = false;
        } else {
            actionText = __('Upgrade to', 'quillforms') + ` ${featurePlanLabel}`;
            actionLink = isWPEnv ? 'https://quillforms.com' : '/admin.php?page=quillforms&path=checkout';
            isExternalLink = isWPEnv;
        }
    }

    const ActionComponent = isExternalLink ? 'a' : NavLink;
    const actionProps = isExternalLink ? {
        href: actionLink,
        target: "_blank",
        rel: "noopener noreferrer"
    } : {
        to: actionLink
    };

    const buttonStyles = css`
        padding: 8px 24px;
        background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
        box-shadow: 0 4px 20px rgba(0, 102, 204, 0.15);
        color: white;
        border: none;
        border-radius: 16px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background: linear-gradient(135deg, #0052a3 0%, #004080 100%);
            transform: translateY(-1px);
            box-shadow: 0 6px 25px rgba(0, 102, 204, 0.25);
            color: white;
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.4);
        }
    `;

    return (
        <ActionComponent
            className={`${buttonStyles} ${className}`}
            {...actionProps}
        >
            {actionText}
        </ActionComponent>
    );
};

export default ProButton;