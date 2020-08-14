import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'

import { AirAntdButtonExampleComponent } from './button/button.component'
import { AirAntdIconExampleComponent } from './icon/icon.component'
import { AirAntdTypographyExampleComponent } from './typography/typography.component'
import { AirAntdGridExampleComponent } from './grid/grid.component'
import { AirAntdLayoutExampleComponent } from './layout/layout.component'
import { AirAntdAvatarExampleComponent } from './avatar/avatar.component'
import { AirAntdBadgeExampleComponent } from './badge/badge.component'
import { AirAntdCommentExampleComponent } from './comment/comment.component'
import { AirAntdCollapseExampleComponent } from './collapse/collapse.component'
import { AirAntdCarouselExampleComponent } from './carousel/carousel.component'
import { AirAntdCardExampleComponent } from './card/card.component'
import { AirAntdCalendarExampleComponent } from './calendar/calendar.component'
import { AirAntdListExampleComponent } from './list/list.component'
import { AirAntdPopoverExampleComponent } from './popover/popover.component'
import { AirAntdTreeExampleComponent } from './tree/tree.component'
import { AirAntdTooltipExampleComponent } from './tooltip/tooltip.component'
import { AirAntdTimelineExampleComponent } from './timeline/timeline.component'
import { AirAntdTagExampleComponent } from './tag/tag.component'
import { AirAntdTabsExampleComponent } from './tabs/tabs.component'
import { AirAntdTableExampleComponent } from './table/table.component'
import { AirAntdAutoCompleteExampleComponent } from './autocomplete/autocomplete.component'
import { AirAntdCheckboxExampleComponent } from './checkbox/checkbox.component'
import { AirAntdCascaderExampleComponent } from './cascader/cascader.component'
import { AirAntdDatePickerExampleComponent } from './datepicker/datepicker.component'
import { AirAntdFormExampleComponent } from './form/form.component'
import { AirAntdInputNumberExampleComponent } from './inputnumber/inputnumber.component'
import { AirAntdInputExampleComponent } from './input/input.component'
import { AirAntdMentionExampleComponent } from './mention/mention.component'
import { AirAntdRateExampleComponent } from './rate/rate.component'
import { AirAntdRadioExampleComponent } from './radio/radio.component'
import { AirAntdSwitchExampleComponent } from './switch/switch.component'
import { AirAntdSliderExampleComponent } from './slider/slider.component'
import { AirAntdSelectExampleComponent } from './select/select.component'
import { AirAntdTreeSelectExampleComponent } from './treeselect/treeselect.component'
import { AirAntdTransferExampleComponent } from './transfer/transfer.component'
import { AirAntdTimePickerExampleComponent } from './timepicker/timepicker.component'
import { AirAntdUploadExampleComponent } from './upload/upload.component'
import { AirAntdAlertExampleComponent } from './alert/alert.component'
import { AirAntdDrawerExampleComponent } from './drawer/drawer.component'
import { AirAntdModalExampleComponent } from './modal/modal.component'
import { AirAntdMessageExampleComponent } from './message/message.component'
import { AirAntdNotificationExampleComponent } from './notification/notification.component'
import { AirAntdProgressExampleComponent } from './progress/progress.component'
import { AirAntdPopconfirmExampleComponent } from './popconfirm/popconfirm.component'
import { AirAntdSpinExampleComponent } from './spin/spin.component'
import { AirAntdSkeletonExampleComponent } from './skeleton/skeleton.component'
import { AirAntdAffixExampleComponent } from './affix/affix.component'
import { AirAntdBreadcrumbExampleComponent } from './breadcrumb/breadcrumb.component'
import { AirAntdDropdownExampleComponent } from './dropdown/dropdown.component'
import { AirAntdMenuExampleComponent } from './menu/menu.component'
import { AirAntdPaginationExampleComponent } from './pagination/pagination.component'
import { AirAntdStepsExampleComponent } from './steps/steps.component'
import { AirAntdAnchorExampleComponent } from './anchor/anchor.component'
import { AirAntdBackTopExampleComponent } from './backtop/backtop.component'
import { AirAntdDividerExampleComponent } from './divider/divider.component'

const COMPONENTS = [
  AirAntdButtonExampleComponent,
  AirAntdIconExampleComponent,
  AirAntdTypographyExampleComponent,
  AirAntdGridExampleComponent,
  AirAntdLayoutExampleComponent,
  AirAntdAvatarExampleComponent,
  AirAntdBadgeExampleComponent,
  AirAntdCommentExampleComponent,
  AirAntdCollapseExampleComponent,
  AirAntdCarouselExampleComponent,
  AirAntdCardExampleComponent,
  AirAntdCalendarExampleComponent,
  AirAntdListExampleComponent,
  AirAntdPopoverExampleComponent,
  AirAntdTreeExampleComponent,
  AirAntdTooltipExampleComponent,
  AirAntdTimelineExampleComponent,
  AirAntdTagExampleComponent,
  AirAntdTabsExampleComponent,
  AirAntdTableExampleComponent,
  AirAntdAutoCompleteExampleComponent,
  AirAntdCheckboxExampleComponent,
  AirAntdCascaderExampleComponent,
  AirAntdDatePickerExampleComponent,
  AirAntdFormExampleComponent,
  AirAntdInputNumberExampleComponent,
  AirAntdInputExampleComponent,
  AirAntdMentionExampleComponent,
  AirAntdRateExampleComponent,
  AirAntdRadioExampleComponent,
  AirAntdSwitchExampleComponent,
  AirAntdSliderExampleComponent,
  AirAntdSelectExampleComponent,
  AirAntdTreeSelectExampleComponent,
  AirAntdTransferExampleComponent,
  AirAntdTimePickerExampleComponent,
  AirAntdUploadExampleComponent,
  AirAntdAlertExampleComponent,
  AirAntdDrawerExampleComponent,
  AirAntdModalExampleComponent,
  AirAntdMessageExampleComponent,
  AirAntdNotificationExampleComponent,
  AirAntdProgressExampleComponent,
  AirAntdPopconfirmExampleComponent,
  AirAntdSpinExampleComponent,
  AirAntdSkeletonExampleComponent,
  AirAntdAffixExampleComponent,
  AirAntdBreadcrumbExampleComponent,
  AirAntdDropdownExampleComponent,
  AirAntdMenuExampleComponent,
  AirAntdPaginationExampleComponent,
  AirAntdStepsExampleComponent,
  AirAntdAnchorExampleComponent,
  AirAntdBackTopExampleComponent,
  AirAntdDividerExampleComponent,
]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AntdUIKitExamplesModule {}
