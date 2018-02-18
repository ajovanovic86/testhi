/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { MehanicarTestModule } from '../../../test.module';
import { AutoTipComponent } from '../../../../../../main/webapp/app/entities/auto-tip/auto-tip.component';
import { AutoTipService } from '../../../../../../main/webapp/app/entities/auto-tip/auto-tip.service';
import { AutoTip } from '../../../../../../main/webapp/app/entities/auto-tip/auto-tip.model';

describe('Component Tests', () => {

    describe('AutoTip Management Component', () => {
        let comp: AutoTipComponent;
        let fixture: ComponentFixture<AutoTipComponent>;
        let service: AutoTipService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MehanicarTestModule],
                declarations: [AutoTipComponent],
                providers: [
                    AutoTipService
                ]
            })
            .overrideTemplate(AutoTipComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutoTipComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutoTipService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new AutoTip(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.autoTips[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
